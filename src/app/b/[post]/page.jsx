import PageLayout from '@/components/PageLayout/PageLayout';
import MainImage from '@/components/Images/MainImage';
import styles from '@/app/s/[page]/page.module.scss';
import Sections from '@/components/Sections/Sections';
import { getDefaultLangCode, getPost } from '@/helpers/sanity';
import { getGenerateMetadataFunc, getGenerateStaticParamsFunc } from '@/helpers/dataGenerators';
import { getHref } from '@/helpers/getHref';

export const generateStaticParams = getGenerateStaticParamsFunc('post', true);
export const generateMetadata = getGenerateMetadataFunc('post');

const Post = async ({ params }) => {
  const { lang, post } = params;

  // this is a hack to fix a bug in next.js
  if (post === 'null-element') return null;

  const currentLang = lang || await getDefaultLangCode();
  if (!post || !currentLang) return null;

  const { title, mainImage, sections, shortTitle } = await getPost(params.post, currentLang) || {};

  return (
    <PageLayout
      href={getHref('internalPost', post, !lang, currentLang)}
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

export default Post;
