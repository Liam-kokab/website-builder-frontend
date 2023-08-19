import PropTypes from 'prop-types';
import LanguageSwitcher from './LanguageSwitcher';
import MenuItems from './MenuItems';
import MobileMenu from './MoibleMenu';
import styles from './Header.module.scss';

const Header = ({ menu = [], pageName = '', href, isDefaultLang, langCode, languages, defaultLanguage }) => (
  <div className={styles.headerContainer}>
    <h1>{pageName}</h1>
    <nav className={styles.menuContainer}>
      <MenuItems menu={menu} href={href} isDefaultLang={isDefaultLang} langCode={langCode} />
    </nav>
    <MobileMenu
      menu={menu}
      href={href}
      pageName={pageName}
      isDefaultLang={isDefaultLang}
      langCode={langCode}
      languages={languages}
      defaultLanguage={defaultLanguage}
    />
    { languages.length > 1
      ? <LanguageSwitcher languages={languages} defaultLanguage={defaultLanguage} currentLang={langCode} className={styles.languageSelect} />
      : null}
  </div>
);

Header.propTypes = {
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
  href: PropTypes.string.isRequired,
  isDefaultLang: PropTypes.bool.isRequired,
  langCode: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultLanguage: PropTypes.string.isRequired,
};

export default Header;
