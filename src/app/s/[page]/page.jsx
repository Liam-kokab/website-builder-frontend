import { getDefaultLangCode, getPage } from '@/helpers/sanity';
import MainImage from '@/components/Images/MainImage';
import Sections from '@/components/Sections/Sections';
import PageLayout from '@/components/PageLayout/PageLayout';
import { getGenerateMetadataFunc, getGenerateStaticParamsFunc } from '@/helpers/dataGenerators';
import { getHref } from '@/helpers/getHref';
import styles from './page.module.scss';

export const generateStaticParams = getGenerateStaticParamsFunc('page', true);
export const generateMetadata = getGenerateMetadataFunc('page');

const Page = async ({ params = {} }) => {
  const { lang, page } = params;

  // this is a hack to fix a bug in next.js
  if (page === 'null-element') return null;

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
