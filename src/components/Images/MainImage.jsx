import PropTypes from 'prop-types';
import { urlFor } from '@/helpers/imageUrl';
import { maxWith } from '@/settings';
import { imageType } from './types';
import style from './images.module.scss';

const widthHeight = [
  { width: 300, height: 240, max: 350 },
  { width: 400, height: 240, max: 450 },
  { width: 500, height: 240, max: 550 },
  { width: 600, height: 240, max: 700 },
  { width: 800, height: 240, max: 900 },
  { width: 1000, height: 250, max: 1050 },
  // { width: 1200, height: 300, max: 999999 },
];

const MainImage = ({ image, title = '' }) => {
  const url1 = urlFor(image).width(maxWith).height(300).url();

  const serSet = widthHeight.map(({ width, height, max }) => ({
    url: urlFor(image)
      .width(width * 1.5)
      .height(height * 1.5)
      .quality(80)
      .url(),

    media: `(max-width: ${max}px)`,
  }));

  return (
    <div className={style.mainImage}>
      <picture>
        {
          serSet.map(({ url, media }) => (
            <source key={media} media={media} srcSet={url} />
          ))
        }
        <img src={url1} alt="Flowers" />
      </picture>
      { title ? <h1>{title}</h1> : null }
    </div>
  );
};

MainImage.propTypes = {
  image: imageType.isRequired,
  title: PropTypes.string,
};

export default MainImage;
