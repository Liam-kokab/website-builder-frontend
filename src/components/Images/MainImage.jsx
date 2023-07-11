import PropTypes from 'prop-types';

const MainImage = ({ image }) => (
  <div className="main-image">
    <img src={image} alt="main" />
  </div>
);

MainImage.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    palette: PropTypes.string.isRequired,
    hotspot: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    crp: PropTypes.shape({
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number,
    }),
  }).isRequired,
};
