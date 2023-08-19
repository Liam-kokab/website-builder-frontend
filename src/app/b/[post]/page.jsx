import { getDefaultLangCode, getPost, getPosts } from '@/helpers/sanity';
import PageLayout from '@/components/PageLayout/PageLayout';
import MainImage from '@/components/Images/MainImage';
import styles from '@/app/s/[page]/page.module.scss';
import Sections from '@/components/Sections/Sections';
import { getHref } from '@/helpers/getHref';

export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ post: slug }));
};

const Post = async ({ params }) => {
  const { lang, post } = params;
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
