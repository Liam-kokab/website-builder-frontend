import PropTypes from 'prop-types';
import { getAvailableLangCodes, getDefaultLangCode, getProducts } from '@/helpers/sanity';
import Product from '@/app/p/[product]/page';

export const generateStaticParams = async () => {
  const [
    pages,
    availableLangCodes,
    defaultLang,
  ] = await Promise.all([
    getProducts(),
    getAvailableLangCodes(),
    getDefaultLangCode(),
  ]);

  return availableLangCodes
    .filter((lang) => lang !== undefined)
    .flatMap((lang) => pages.filter(({ status }) => status === 'available').map(({ slug }) => ({ product: slug, lang })));
};

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
