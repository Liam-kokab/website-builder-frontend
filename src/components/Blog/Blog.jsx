import PropTypes from 'prop-types';
import { getNewestPosts } from '@/helpers/sanity';
import BlogTable from '@/components/Blog/BlogTable';
import styles from './blog.module.scss';

const Blog = async ({ blogPage }) => {
  const { count = 100, blogSectionType = 'newest', postGroup = [] } = blogPage;
  const posts = blogSectionType === 'predefined' ? postGroup : await getNewestPosts('no');

  return (
    <div className={styles.blogPage}>
      <BlogTable posts={posts} count={count} />
    </div>
  );
};

Blog.defaultProps = {
  blogPage: {},
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
  }),
};

export default Blog;
