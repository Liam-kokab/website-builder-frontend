import PropTypes from 'prop-types';
import styles from './video.module.scss';

const Video = ({ video }) => {
  if (!video?.url) return null;
  const { url, width, placement, customWidth } = video;
  const videoCode = url?.split('v=')?.[1];

  const iframeStyle = width === 'custom-width' ? { width: customWidth } : {};

  return (
    <div className={`${styles.contentVideo} ${styles[placement]}`}>
      <iframe
        title="YouTube video player"
        src={`https://www.youtube-nocookie.com/embed/${videoCode}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={`${styles.video} ${styles[width]}`}
        style={iframeStyle}
      />
    </div>
  );
};

Video.defaultProps = {
  video: {},
};

Video.propTypes = {
  video: PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.string,
    placement: PropTypes.string,
    customWidth: PropTypes.string,
  }),
};

export default Video;
