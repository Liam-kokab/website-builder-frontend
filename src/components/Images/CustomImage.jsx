import PropTypes from 'prop-types';
import styles from '@/components/Images/images.module.scss';
import { urlFor } from '@/helpers/imageUrl';
import { maxWith } from '@/settings';
import { getNumberFromString } from '@/helpers/string';

const CustomImage = ({ image = null, partSize = '12fr' }) => {
  const { title = '', description = '', circle = false } = image;
  const imageWidth = (maxWith / 12) * Math.max(getNumberFromString(partSize), 4);
  const imageHeight = imageWidth * 0.75;

  return (
    <div className={styles.customImageContainer}>
      <img
        alt={title}
        src={urlFor(image).width(imageWidth).height(imageHeight).url()}
        className={circle ? styles.circle : null}
      />
      <h3>{title || ''}</h3>
      <p>{description || ''}</p>
    </div>
  );
};

CustomImage.propTypes = {
  partSize: PropTypes.string,
  image: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    circle: PropTypes.bool,
  }),
};

export default CustomImage;
