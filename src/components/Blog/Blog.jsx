import PropTypes from 'prop-types';
import { getNewestPosts } from '@/helpers/sanity';
import BlogTable from '@/components/Blog/BlogTable';
import styles from './blog.module.scss';

const Blog = async ({ blogPage = {}, lang, isDefaultLang }) => {
  const { count = 100, blogSectionType = 'newest', postGroup = [] } = blogPage;
  const posts = blogSectionType === 'predefined' ? postGroup : await getNewestPosts('no');

  return (
    <div className={styles.blogPage}>
      <BlogTable posts={posts} count={count} lang={lang} isDefaultLang={isDefaultLang} />
    </div>
  );
};

Blog.propTypes = {
  blogPage: PropTypes.shape({
    count: PropTypes.number,
    blogSectionType: PropTypes.string.isRequired,
    postGroup: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      shortTitle: PropTypes.string,
      slug: PropTypes.string,
      status: PropTypes.string,
      mainImage: PropTypes.shape({
        asset: PropTypes.shape({}),
      }),
    })),
    lang: PropTypes.string.isRequired,
    isDefaultLang: PropTypes.bool.isRequired,
  }),
};

export default Blog;
