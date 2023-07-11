import { urlFor } from '@/helpers/sanity';
import PropTypes from 'prop-types';
import { imageType } from './types';
import style from './images.module.scss';

const MainImage = ({ image, width, title }) => {
  const url = urlFor(image).width(width).height(width / 4).url();

  return (
    <div className={style.mainImage}>
      <img src={url} alt={image.alt} />
      { title ? <h1>{title}</h1> : null }
    </div>
  );
};

MainImage.defaultProps = {
  width: 1200,
  title: '',
};

MainImage.propTypes = {
  image: imageType.isRequired,
  width: PropTypes.number,
  title: PropTypes.string,
};

export default MainImage;
