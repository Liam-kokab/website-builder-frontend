import { getPost, getPosts } from '@/helpers/sanity';
import PageLayout from '@/components/PageLayout/PageLayout';

export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ post: slug }));
};

const Post = async ({ params }) => {
  const { title } = await getPost(params.post, 'no') || {};

  return (
    <PageLayout pageName={`/post/${params.post}`}>
      <h1>
        Post
        {title}
      </h1>
    </PageLayout>
  );
};

export default Post;
