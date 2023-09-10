import PropTypes from 'prop-types';
import ImageTable from '@/components/Images/ImageGroup/ImageTable';
import ImageAlbum from '@/components/Images/ImageGroup/ImageAlbum';
import ImageSlidingAlbum from '@/components/Images/ImageGroup/ImageSlidingAlbum';
import styles from '../images.module.scss';

const AlbumVariants = ['standard', 'album', 'slidingAlbum'];

const AlbumVariant = ({ images = [], partSize = '12fr', circle = false, viewVariant = '' }) => {
  switch (viewVariant) {
    case 'standard':
      return <ImageTable images={images} partSize={partSize} circle={circle} />;
    case 'album':
      return <ImageAlbum images={images} partSize={partSize} circle={circle} />;
    case 'slidingAlbum':
      return <ImageSlidingAlbum images={images} partSize={partSize} circle={circle} />;
    default:
      return null;
  }
};

AlbumVariant.propTypes = {
  partSize: PropTypes.string.isRequired,
  viewVariant: PropTypes.oneOf(AlbumVariants),
  circle: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  })),
};

const ImageGroup = ({ imageGroup = {}, partSize }) => {
  const { images = [], title: groupTitle, description: groupDescription, viewVariant, circle } = imageGroup;

  return (
    <div className={styles.imageGroup}>
      {groupTitle ? <h2 className={styles.groupTile}>{groupTitle}</h2> : null}
      <AlbumVariant images={images} partSize={partSize} circle={circle} viewVariant={viewVariant} />
      {groupDescription ? <p>{groupDescription}</p> : null}
    </div>
  );
};

ImageGroup.propTypes = {
  partSize: PropTypes.string.isRequired,
  imageGroup: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    viewVariant: PropTypes.oneOf(AlbumVariants),
    circle: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    })),
  }),
};

export default ImageGroup;
