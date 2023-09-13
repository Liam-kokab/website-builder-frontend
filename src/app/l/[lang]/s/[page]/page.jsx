import PropTypes from 'prop-types';
import Page from '@/app/s/[page]/page';
import Index from '@/app/page';
import { getGenerateMetadataFunc, getGenerateStaticParamsFunc } from '@/helpers/dataGenerators';

export const generateStaticParams = getGenerateStaticParamsFunc('page', false);
export const generateMetadata = getGenerateMetadataFunc('page');

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
