import PropTypes from 'prop-types';
import { getAvailableLangCodes, getDefaultLangCode, getPosts } from '@/helpers/sanity';
import Post from '@/app/b/[post]/page';

export const generateStaticParams = async () => {
  const [
    pages,
    availableLangCodes,
    defaultLang,
  ] = await Promise.all([
    getPosts(),
    getAvailableLangCodes(),
    getDefaultLangCode(),
  ]);

  return availableLangCodes
    .filter((lang) => lang !== undefined)
    .flatMap((lang) => pages.filter(({ status }) => status === 'available').map(({ slug }) => ({ post: slug, lang })));
};

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
