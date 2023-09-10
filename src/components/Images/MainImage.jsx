import { urlFor } from '@/helpers/sanity';
import PropTypes from 'prop-types';
import { maxWith } from '@/settings';
import { imageType } from './types';
import style from './images.module.scss';

const MainImage = ({ image, width = maxWith, title = '' }) => {
  const url = urlFor(image).width(width).height(width / 4).url();

  return (
    <div className={style.mainImage}>
      <img src={url} alt={image.title} />
      { title ? <h1>{title}</h1> : null }
    </div>
  );
};

MainImage.propTypes = {
  image: imageType.isRequired,
  width: PropTypes.number,
  title: PropTypes.string,
};

export default MainImage;
