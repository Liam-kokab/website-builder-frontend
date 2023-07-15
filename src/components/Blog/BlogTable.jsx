import PropTypes from 'prop-types';
import Link from 'next/link';
import { urlFor } from '@/helpers/sanity';
import styles from './blog.module.scss';

const imageWidth = 250;

const BlogTable = ({ count, posts }) => (
  <div className={styles.blogTable}>
    {
      posts
        .filter(({ status }) => status === 'available')
        .map(({ title, shortTitle, slug, mainImage }, index) => (
          <Link href={`/post/${slug}`} key={`${slug}-${index}`}>
            <div className={styles.blogTableRow}>
              {
                mainImage?.asset
                  ? (
                    <img
                      src={urlFor(mainImage).width(imageWidth).height(Math.round((imageWidth * 9) / 16)).url()}
                      alt={mainImage.alt}
                    />
                  )
                  : <div />
              }
              <h2>{shortTitle || title}</h2>
            </div>
          </Link>
        ))
    }
  </div>
);

BlogTable.defaultProps = {
  count: 100,
  posts: [],
};

BlogTable.propTypes = {
  count: PropTypes.number,
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    shortTitle: PropTypes.string,
    slug: PropTypes.string,
    status: PropTypes.string,
    mainImage: PropTypes.shape({
      asset: PropTypes.shape({}),
    }),
  })),
};

export default BlogTable;
