'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import LanguageSwitcher from '@/components/PageLayout/Header/LanguageSwitcher';
import styles from './Header.module.scss';
import MenuItems from './MenuItems';

const MobileMenu = ({ menu = [], pageName = '', href = '', isDefaultLang = true, langCode = '', languages, defaultLanguage }) => {
  const [showMenu, setShowMenu] = useState(false);

  const onClick = () => {
    setShowMenu((prevState) => {
      const mainElement = document.getElementById('parent-of-all');
      if (!prevState) {
        mainElement.style.overflow = 'hidden';
        mainElement.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        mainElement.style.overflow = 'unset';
      }

      return !prevState;
    });
  };

  return (
    <div className={styles.mobileMenuContainer}>
      <button onClick={onClick} type="button" className={`${styles.menuHamburgerButton} ${showMenu ? styles.close : styles.open}`}>
        <span />
      </button>
      {
        showMenu
          ? (
            <>
              <nav className={styles.mobileMenu}>
                <MenuItems menu={menu} pageName={pageName} isDefaultLang={isDefaultLang} langCode={langCode} href={href} />
              </nav>
              <LanguageSwitcher defaultLanguage={defaultLanguage} languages={languages} currentLang={langCode} className={styles.mobileLanguageSelect} />
            </>
          ) : null
      }
    </div>
  );
};

MobileMenu.propTypes = {
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
  href: PropTypes.string,
  isDefaultLang: PropTypes.bool,
  langCode: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultLanguage: PropTypes.string.isRequired,
};

export default MobileMenu;
