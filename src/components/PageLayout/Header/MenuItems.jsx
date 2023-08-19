import PropTypes from 'prop-types';
import { getHref } from '@/helpers/getHref';
import Link from 'next/link';
import styles from './Header.module.scss';

const MenuItems = ({ href, menu = [], isDefaultLang, langCode }) => menu
  .filter(({ status, linkType }) => status === 'available' || linkType === 'external')
  .map(({ title = '', shortTitle = '', externalLinkUrl = '', slug = '', linkType, useDocumentTitle = true, linkTitle = '', _key = '', openInNewTab = false }) => {
    const currentHref = getHref(linkType, slug, isDefaultLang, langCode, externalLinkUrl);

    return (
      <Link
        className={`${styles.menuButtons} ${currentHref === href ? styles.selected : ''}`}
        key={_key}
        href={currentHref}
        title={useDocumentTitle || !linkTitle ? (shortTitle || title || linkTitle) : linkTitle}
        target={openInNewTab ? '_blank' : ''}
      >
        {useDocumentTitle || !linkTitle ? (shortTitle || title || linkTitle) : linkTitle}
      </Link>
    );
  });

MenuItems.propTypes = {
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
  href: PropTypes.string.isRequired,
  isDefaultLang: PropTypes.bool.isRequired,
  langCode: PropTypes.string.isRequired,
};

export default MenuItems;
