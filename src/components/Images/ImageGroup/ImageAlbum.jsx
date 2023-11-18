'use client';

import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '@/components/Images/images.module.scss';
import CustomImage from '@/components/Images/CustomImage';

const minSwipeDistance = 50;

const ImageAlbum = ({ images = [], partSize = '12fr', circle = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mainContainer = useRef(null);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const [showBigImage, setShowBigImage] = useState(false);

  const showBigImageHandler = () => {
    setShowBigImage((prevState) => {
      const mainElement = document.getElementById('parent-of-all');
      if (!prevState) {
        mainElement.style.overflow = 'hidden';
      } else {
        mainElement.style.overflow = 'unset';
      }

      return !prevState;
    });
  };

  const changeImage = (sign = '') => {
    setCurrentImageIndex((prevState) => {
      if (sign === '+') return (prevState + 1) % images.length;
      if (sign === '-') return (prevState - 1 + images.length) % images.length;
      return 0;
    });
  };

  const onImageClick = ({ currentTarget }) => {
    const index = parseInt(currentTarget.dataset.index, 10);
    if (!Number.isNaN(index)) {
      setCurrentImageIndex(index);
    }
  };

  const onTouchStart = ({ nativeEvent }) => {
    if (nativeEvent?.touches?.length !== 1) return;
    touchEnd.current = null;
    touchStart.current = nativeEvent.touches[0].pageX;
  };

  const onTouchMove = (e) => {
    if (e.nativeEvent.touches.length !== 1) return;
    touchEnd.current = e.nativeEvent.touches[0].pageX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    if (touchStart.current - touchEnd.current > minSwipeDistance) {
      changeImage('+');
    } else if (touchEnd.current - touchStart.current > minSwipeDistance) {
      changeImage('-');
    }
  };

  const currentImage = images[currentImageIndex];

  return (
    <>
      <div className={styles.imageAlbumContainer} ref={mainContainer} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <button
          type="button"
          className={styles.currentImage}
          data-index={currentImageIndex}
          onClick={showBigImageHandler}
          aria-label="show big image"
        >
          <CustomImage partSize={partSize} image={{ ...currentImage, circle }} />
        </button>
        <div className={styles.imageAlbumListContainer}>
          {
            images.map((image, index) => (
              <button
                type="button"
                className={currentImageIndex === index ? `${styles.albumImage} ${styles.selectedImage}` : styles.albumImage}
                key={`${image.title}-${index}`}
                data-index={index}
                onClick={onImageClick}
                aria-label="select image"
              >
                <CustomImage partSize="1fr" image={{ ...image, circle }} />
              </button>
            ))
          }
        </div>
      </div>
      {
        showBigImage
          ? (
            <button type="button" className={styles.bigImage} onClick={showBigImageHandler} aria-label="close">
              <CustomImage partSize="12fr" image={currentImage} />
            </button>
          ) : null
      }
    </>
  );
};

ImageAlbum.propTypes = {
  partSize: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  })),
  circle: PropTypes.bool,
};

export default ImageAlbum;
