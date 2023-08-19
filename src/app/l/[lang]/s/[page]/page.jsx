import PropTypes from 'prop-types';
import { getAvailableLangCodes, getDefaultLangCode, getPages } from '@/helpers/sanity';
import Page from '@/app/s/[page]/page';
import Index from '@/app/page';

export const generateStaticParams = async () => {
  const [
    pages,
    availableLangCodes,
    defaultLang,
  ] = await Promise.all([
    getPages(),
    getAvailableLangCodes(),
    getDefaultLangCode(),
  ]);

  return availableLangCodes
    .filter((lang) => lang !== undefined)
    .flatMap((lang) => pages.filter(({ status }) => status === 'available').map(({ slug }) => ({ page: slug === 'index' ? 'h' : slug, lang })));
};

const PageWithLang = ({ params = {} }) => {
  const { lang, page } = params;
  return page === 'h'
    ? <Index lang={lang} />
    : <Page params={{ page, lang }} />;
};

PageWithLang.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
  }),
};

export default PageWithLang;
