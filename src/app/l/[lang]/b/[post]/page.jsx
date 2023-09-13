import PropTypes from 'prop-types';
import Post from '@/app/b/[post]/page';
import { getGenerateMetadataFunc, getGenerateStaticParamsFunc } from '@/helpers/dataGenerators';

export const generateStaticParams = getGenerateStaticParamsFunc('post', false);
export const generateMetadata = getGenerateMetadataFunc('post');

const PostWithLang = ({ params = {} }) => {
  const { lang, post } = params;
  return <Post params={{ post, lang }} />;
};

PostWithLang.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
  }),
};

export default PostWithLang;
