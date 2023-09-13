import PageLayout from '@/components/PageLayout/PageLayout';
import { getDefaultLangCode, getProduct } from '@/helpers/sanity';
import { getHref } from '@/helpers/getHref';
import { getGenerateMetadataFunc, getGenerateStaticParamsFunc } from '@/helpers/dataGenerators';

export const generateStaticParams = getGenerateStaticParamsFunc('product', true);
export const generateMetadata = getGenerateMetadataFunc('product');

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
