import PropTypes from 'prop-types';
import { urlFor } from '@/helpers/sanity';
import { maxWith } from '@/settings';
import { getNumberFromString } from '@/helpers/string';
import styles from './images.module.scss';

const ImageGroup = ({ imageGroup, partSize }) => {
  const { images = [], title: groupTitle, description: groupDescription, viewVariant, circle } = imageGroup;
  const imageWidth = (maxWith / 12) * getNumberFromString(partSize);

  return viewVariant
    ? (
      <div className={styles.imageGroup}>
        {images.map(({ title, description, ...image }, index) => (
          <div key={`${title}-${index}`} className={styles.eachImageContainer}>
            <img
              alt={title}
              key={image._key}
              src={urlFor(image).width(imageWidth).url()}
              className={circle ? styles.circle : null}
            />
            {title ? <h3>{title}</h3> : null}
            { description ? <p>{description}</p> : null }
          </div>
        ))}
      </div>
    )
    : (<div>Coming soon!</div>);
};

ImageGroup.defaultProps = {
  imageGroup: {},
};

ImageGroup.propTypes = {
  partSize: PropTypes.string.isRequired,
  imageGroup: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    viewVariant: PropTypes.string,
    circle: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    })),
  }),
};

export default ImageGroup;
