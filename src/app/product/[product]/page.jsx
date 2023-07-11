import { getProduct, getProducts } from '@/helpers/sanity';
import PageLayout from '@/components/PageLayout/PageLayout';

export const generateStaticParams = async () => {
  const posts = await getProducts();
  return posts.map(({ slug }) => ({ product: slug }));
};

const Post = async ({ params }) => {
  const { title } = await getProduct(params.product, 'no') || {};

  return (
    <PageLayout pageName={`/product/${params.product}`}>
      <h1>
        Product
        {title}
      </h1>
    </PageLayout>
  );
};

export default Post;
