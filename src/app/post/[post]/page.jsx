// eslint-disable-next-line import/extensions, import/no-unresolved
import { getPost, getPosts } from '@/helpers/sanity';

export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
};

const Post = async ({ params }) => {
  const { title } = await getPost(params.slug) || {};

  return (
    <div>
      <h1>
        Post
        {title}
      </h1>
    </div>
  );
};

export default Post;
