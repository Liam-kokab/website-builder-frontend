import { getDefaultLangCode, getProduct, getProducts } from '@/helpers/sanity';
import PageLayout from '@/components/PageLayout/PageLayout';
import { getHref } from '@/helpers/getHref';

export const generateStaticParams = async () => {
  const posts = await getProducts();
  return posts.map(({ slug }) => ({ product: slug }));
};

const Product = async ({ params }) => {
  const { lang, product } = params;
  const currentLang = lang || await getDefaultLangCode();
  if (!product || !currentLang) return null;

  const { title, shortTitle } = await getProduct(product, currentLang) || {};

  return (
    <PageLayout
      href={getHref('internalProduct', product, !lang, currentLang)}
      pageName={shortTitle || title}
      langCode={currentLang}
      isDefaultLang={!lang}
    >
      <h1>
        Product Page is under construction
      </h1>
      <h2>
        {title}
      </h2>
    </PageLayout>
  );
};

export default Product;
