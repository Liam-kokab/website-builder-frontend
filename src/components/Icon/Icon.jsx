import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ icon = '', size = '2x' }) => (
  <FontAwesomeIcon icon={icon} size={size} />
);

Icon.propTypes = {
  size: PropTypes.string,
  icon: PropTypes.shape({
    icon: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ])),
    iconName: PropTypes.string,
    prefix: PropTypes.string,
  }),
};

export default Icon;
