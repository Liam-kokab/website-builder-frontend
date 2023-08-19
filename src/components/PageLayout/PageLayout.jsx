import PropTypes from 'prop-types';
import { getAvailableLangCodes, getDefaultLangCode, getSiteSettings } from '@/helpers/sanity';
import Header from '@/components/PageLayout/Header/Header';
import Footer from '@/components/PageLayout/Footer';
import styles from './pageLayout.module.scss';

const getSettings = async (langCode) => {
  const [
    settings,
    languages,
    defaultLanguage,
  ] = await Promise.all([
    getSiteSettings(langCode),
    getAvailableLangCodes(),
    getDefaultLangCode(),
  ]);

  return {
    ...settings,
    languages,
    defaultLanguage,
  };
};

const PageLayout = async ({ children = null, href, langCode, isDefaultLang }) => {
  const { menu, footer, general, languages, defaultLanguage } = await getSettings(langCode);

  return (
    <div className={styles.pageContainer}>
      <Header
        menu={menu}
        pageName={general.title}
        href={href}
        isDefaultLang={isDefaultLang}
        langCode={langCode}
        languages={languages}
        defaultLanguage={defaultLanguage}
      />
      <div className={styles.mainContent}>{children}</div>
      <Footer footer={footer} />
    </div>
  );
};

PageLayout.prototype = {
  children: PropTypes.node,
  pageName: PropTypes.string,
  href: PropTypes.string.isRequired,
  langCode: PropTypes.string.isRequired,
  isDefaultLang: PropTypes.bool.isRequired,
};

export default PageLayout;
