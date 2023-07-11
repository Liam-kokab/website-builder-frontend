import Link from 'next/link';
import PropTypes from 'prop-types';
import { useParams } from 'next/navigation';
import styles from './Menu.module.scss';

const getHref = (linkType, slug, externalLinkUrl) => {
  switch (linkType) {
    case 'internalPage':
      return `/${slug}`;
    case 'internalProduct':
      return `/product/${slug}`;
    case 'internalPost':
      return `/post/${slug}`;
    case 'external':
      return externalLinkUrl;
    default:
      return '/';
  }
};

const Menu = ({ menu }) => (
  <nav className={styles.menuContainer}>
    <h2 className={styles.menuHeader}>Menu</h2>
    {
      menu
        .filter(({ status, linkType }) => status === 'available' || linkType === 'external')
        .map(({ title = '', shortTitle = '', externalLinkUrl = '', slug = '', linkType = '', useDocumentTitle = true, linkTitle = '', _key = '' }) => (
          <Link
            className={`${styles.menuButtons} ${title === '2' ? styles.selected : ''}`}
            key={_key}
            href={getHref(linkType, slug, externalLinkUrl)}
          >
            {useDocumentTitle || !linkTitle ? (shortTitle || title) : linkTitle}
          </Link>
        ))
    }
  </nav>
);

Menu.defaultProps = {
  menu: [],
};

Menu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    shortTitle: PropTypes.string,
    externalLinkUrl: PropTypes.string,
    slug: PropTypes.string,
    status: PropTypes.string,
    linkType: PropTypes.oneOf(['internalPage', 'internalProduct', 'internalPost', 'external']),
    useDocumentTitle: PropTypes.bool,
    linkTitle: PropTypes.string,
    _key: PropTypes.string,
  })),
};

export default Menu;
