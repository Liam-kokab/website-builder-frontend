'use client';

import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '@/components/Images/images.module.scss';
import CustomImage from '@/components/Images/CustomImage';

const minSwipeDistance = 50;

const ImageSlidingAlbum = ({ images = [], partSize = '12fr', circle = false }) => {
  const mainContainer = useRef(null);
  const currentImageIndex = useRef(0);
  const timeInterval = useRef(null);
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

  const changeImage = (index) => {
    const target = mainContainer?.current?.children?.[index];

    if (target) {
      currentImageIndex.current = index;
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const onImageClick = ({ currentTarget }) => {
    const index = parseInt(currentTarget.dataset.index, 10);
    if (Number.isNaN(index)) return;

    if (timeInterval.current) clearInterval(timeInterval.current);
    if (index === currentImageIndex.current) showBigImageHandler();
    else changeImage(index);
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
      changeImage((currentImageIndex.current + 1) % images.length);
    } else if (touchEnd.current - touchStart.current > minSwipeDistance) {
      changeImage((currentImageIndex.current - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    timeInterval.current = setInterval(() => {
      // changeImage((currentImageIndex.current + 1) % images.length);
    }, 5000);

    const onResize = () => {
      changeImage(currentImageIndex.current);
    };

    window.addEventListener('resize', onResize);

    return () => {
      clearInterval(timeInterval.current);
      window.removeEventListener('resize', onResize);
    };
  }, [images.length]);

  return (
    <>
      <div
        className={styles.imageSlidingAlbumContainer}
        ref={mainContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((image, index) => (
          <button type="button" className={styles.albumImage} key={`${image.title}-${index}`} data-index={index} onClick={onImageClick}>
            <CustomImage partSize={partSize} image={{ ...image, circle }} />
          </button>
        ))}
      </div>
      {
        showBigImage
          ? (
            <button type="button" className={styles.bigImage} onClick={showBigImageHandler}>
              <CustomImage partSize="12fr" image={images[currentImageIndex.current]} />
            </button>
          ) : null
      }
    </>
  );
};

ImageSlidingAlbum.propTypes = {
  partSize: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  })),
  circle: PropTypes.bool,
};

export default ImageSlidingAlbum;
