import PropTypes from 'prop-types';
import Product from '@/app/p/[product]/page';
import { getGenerateMetadataFunc, getGenerateStaticParamsFunc } from '@/helpers/dataGenerators';

export const generateStaticParams = getGenerateStaticParamsFunc('product', false);
export const generateMetadata = getGenerateMetadataFunc('product');

const ProductWithLang = ({ params = {} }) => {
  const { lang, product } = params;
  return <Product params={{ product, lang }} />;
};

ProductWithLang.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
  }),
};

export default ProductWithLang;
