import PropTypes from 'prop-types';
import Checkout from '@/app/e/checkout/page';
import { getGenerateMetadataFunc, getGenerateStaticParamsFunc } from '@/helpers/dataGenerators';

export const generateStaticParams = getGenerateStaticParamsFunc('checkout', false);
export const generateMetadata = getGenerateMetadataFunc('checkout');

const ProductWithLang = ({ params = {} }) => {
  const { lang } = params;
  return <Checkout params={{ lang }} />;
};

ProductWithLang.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }),
};

export default ProductWithLang;
