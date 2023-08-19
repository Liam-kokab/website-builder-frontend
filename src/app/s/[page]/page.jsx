import { getDefaultLangCode, getPage, getPages } from '@/helpers/sanity';
import MainImage from '@/components/Images/MainImage';
import Sections from '@/components/Sections/Sections';
import PageLayout from '@/components/PageLayout/PageLayout';
import { getHref } from '@/helpers/getHref';
import styles from './page.module.scss';

export const generateStaticParams = async () => {
  const pages = await getPages();
  return pages.filter(({ status }) => status === 'available').map(({ slug }) => ({ page: slug }));
};

const Page = async ({ params = {} }) => {
  const { lang, page } = params;
  const currentLang = lang || await getDefaultLangCode();
  if (!page || !currentLang) return null;

  const { title, mainImage, sections, shortTitle } = await getPage(page, currentLang) || {};

  return (
    <PageLayout
      href={getHref('internalPage', page, !lang, currentLang)}
      pageName={shortTitle || title}
      langCode={currentLang}
      isDefaultLang={!lang}
    >
      {
        mainImage?.asset?._ref
          ? <MainImage image={mainImage} title={title} />
          : <h1 className={styles.pageTitle}>{title}</h1>
      }
      <Sections sections={sections} lang={currentLang} isDefaultLang={!lang} />
    </PageLayout>
  );
};

export default Page;
