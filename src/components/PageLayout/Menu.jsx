import Link from 'next/link';
import PropTypes from 'prop-types';
import getHref from '@/helpers/getHref';
import styles from './pageLayout.module.scss';

const Menu = ({ menu, pageName }) => (
  <nav className={styles.menuContainer}>
    {
      menu
        .filter(({ status, linkType }) => status === 'available' || linkType === 'external')
        .map(({ title = '', shortTitle = '', externalLinkUrl = '', slug = '', linkType = '', useDocumentTitle = true, linkTitle = '', _key = '', openInNewTab = false }) => {
          const href = getHref(linkType, slug, externalLinkUrl);

          return (
            <Link
              className={`${styles.menuButtons} ${pageName === href ? styles.selected : ''}`}
              key={_key}
              href={href}
              title={useDocumentTitle || !linkTitle ? (shortTitle || title || linkTitle) : linkTitle}
              target={openInNewTab ? '_blank' : ''}
            >
              {useDocumentTitle || !linkTitle ? (shortTitle || title || linkTitle) : linkTitle}
            </Link>
          );
        })
    }
  </nav>
);

Menu.defaultProps = {
  menu: [],
  pageName: '',
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
  pageName: PropTypes.string,
};

export default Menu;
