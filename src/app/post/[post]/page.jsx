import { getPost, getPosts } from '@/helpers/sanity';
import PageLayout from '@/components/PageLayout/PageLayout';
import MainImage from '@/components/Images/MainImage';
import styles from '@/app/[page]/page.module.scss';
import Sections from '@/components/Sections/Sections';

export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ post: slug }));
};

const Post = async ({ params }) => {
  const { title, mainImage, sections } = await getPost(params.post, 'no') || {};

  return (
    <PageLayout pageName={params.page === 'index' ? '/' : `/${params.page}`}>
      {
        mainImage?.asset?._ref
          ? <MainImage image={mainImage} title={title} />
          : <h1 className={styles.pageTitle}>{title}</h1>
      }
      <Sections sections={sections} />
    </PageLayout>
  );
};

export default Post;
