import PageLayout from '@/components/PageLayout/PageLayout';
import { getDefaultLangCode, getProduct, getSiteSettings } from '@/helpers/sanity';
import { getHref } from '@/helpers/getHref';
import { getGenerateMetadataFunc, getGenerateStaticParamsFunc } from '@/helpers/dataGenerators';
import Sections from '@/components/Sections/Sections';
import ImageAlbum from '@/components/Images/ImageGroup/ImageAlbum';
import Price from '@/components/ProductListing/Price';
import Buy from '@/components/ProductListing/Buy';
import styles from './product.module.scss';

export const generateStaticParams = getGenerateStaticParamsFunc('product', true);
export const generateMetadata = getGenerateMetadataFunc('product');

const Product = async ({ params }) => {
  const { lang, product } = params;

  // this is a hack to fix a bug in next.js
  if (product === 'null-element') return null;

  const currentLang = lang || await getDefaultLangCode();
  const { currency: currencySettings } = await getSiteSettings(lang);
  if (!product || !currentLang) return null;

  const { title, shortTitle, sections, description, images, price } = await getProduct(product, currentLang) || {};

  return (
    <PageLayout
      href={getHref('internalProduct', product, !lang, currentLang)}
      pageName={shortTitle || title}
      langCode={currentLang}
      isDefaultLang={!lang}
    >
      <div className={styles.productSection}>
        <div className="imageGroupContainer">
          <ImageAlbum images={images} partSize="6fr" />
        </div>
        <div className={styles.productDetails}>
          <h1>{title}</h1>
          <p>{description}</p>
          <Price price={price} currencySettings={currencySettings} lang={lang} />
          <Buy productId={product} />
        </div>
      </div>
      <Sections sections={sections} lang={currentLang} isDefaultLang={!lang} />
    </PageLayout>
  );
};

export default Product;
