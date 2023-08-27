import PropTypes from 'prop-types';
import { getSiteSettings } from '@/helpers/sanity';
import ProductTable from './ProductTable';
import styles from './ProductListing.module.scss';

const ProductListing = async ({ productListing = {}, lang, isDefaultLang }) => {
  const { productGroup = [], count = 50 } = productListing;
  const { currency: currencySettings } = await getSiteSettings(lang);

  return (
    <div className={styles.productListingPage}>
      <ProductTable
        products={productGroup}
        count={count}
        lang={lang}
        isDefaultLang={isDefaultLang}
        currencySettings={currencySettings}
      />
    </div>
  );
};

ProductListing.propTypes = {
  productListing: PropTypes.shape({
    count: PropTypes.number,
    productGroup: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      mainImage: PropTypes.shape({
        asset: PropTypes.shape({}),
      }),
      price: PropTypes.shape({}),
      shortTitle: PropTypes.string,
      slug: PropTypes.string,
      status: PropTypes.oneOf(['available', 'disabled', 'hidden']),
      stock: PropTypes.number,
      title: PropTypes.string,
    })),
  }),
  lang: PropTypes.string.isRequired,
  isDefaultLang: PropTypes.bool.isRequired,
};

export default ProductListing;
