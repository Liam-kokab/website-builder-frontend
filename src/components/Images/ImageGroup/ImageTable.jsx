import PropTypes from 'prop-types';
import styles from '@/components/Images/images.module.scss';
import CustomImage from '@/components/Images/CustomImage';

const ImageTable = ({ images = [], partSize = '12fr', circle = false }) => (
  <div className={styles.imageTable}>
    {images.map((image, index) => (
      <CustomImage partSize={partSize} image={{ ...image, circle }} key={`${image.title}-${index}`} />
    ))}
  </div>
);

ImageTable.propTypes = {
  partSize: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  })),
  circle: PropTypes.bool,
};

export default ImageTable;
