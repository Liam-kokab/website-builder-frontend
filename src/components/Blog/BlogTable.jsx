import PropTypes from 'prop-types';
import Link from 'next/link';
import { urlFor } from '@/helpers/sanity';
import { getHref } from '@/helpers/getHref';
import styles from './blog.module.scss';

const imageWidth = 250;
const mobileImageWidth = 750;

const BlogTable = ({ count = 100, posts = [], lang, isDefaultLang }) => (
  <div className={styles.blogTable}>
    {
      posts
        .filter(({ status }) => status === 'available')
        .map(({ title, shortTitle, slug, mainImage }, index) => (
          <Link
            href={getHref('internalPost', slug, isDefaultLang, lang)}
            key={`${slug}-${index}`}
            className={styles.blogTableRow}
          >
            {
              mainImage?.asset
                ? (
                  <>
                    <img
                      className={`${styles.blogTableImage}`}
                      src={urlFor(mainImage).width(imageWidth).height(Math.round((imageWidth * 9) / 16)).url()}
                      alt={mainImage.title}
                    />
                    <img
                      className={`${styles.blogTableImage} ${styles.mobileImage}`}
                      src={urlFor(mainImage).width(mobileImageWidth).height(Math.round((mobileImageWidth * 9) / 16)).url()}
                      alt={mainImage.title}
                    />
                  </>
                )
                : <div className={`${styles.blogTableImage} ${styles.noImage}`} />
            }
            <h2>{shortTitle || title}</h2>
          </Link>
        ))
    }
  </div>
);

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
  lang: PropTypes.string.isRequired,
  isDefaultLang: PropTypes.bool.isRequired,
};

export default BlogTable;
