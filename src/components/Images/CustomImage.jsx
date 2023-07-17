import React from 'react';
import PropTypes from 'prop-types';
import styles from '@/components/Images/images.module.scss';
import { urlFor } from '@/helpers/sanity';
import { maxWith } from '@/settings';
import { getNumberFromString } from '@/helpers/string';

const CustomImage = ({ image, partSize }) => {
  const { title = '', description = '', circle = false } = image;
  const imageWidth = (maxWith / 12) * getNumberFromString(partSize);

  return (
    <div className={styles.imageGroup}>
      <div className={styles.eachImageContainer}>
        <img
          alt={title}
          src={urlFor(image).width(imageWidth).url()}
          className={circle ? styles.circle : null}
        />
        {title ? <h3>{title}</h3> : null}
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
};

CustomImage.defaultProps = {
  image: null,
  partSize: '12fr',
};

CustomImage.propTypes = {
  partSize: PropTypes.string,
  image: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    viewVariant: PropTypes.string,
    circle: PropTypes.bool,
  }),
};

export default CustomImage;
