import PropTypes from 'prop-types';
import Icon from '@/components/Icon/Icon';
import { classNames } from '@/helpers/string';
import styles from './Icon.module.scss';

const IconButton = ({ icon = '', label = '', className = '', ...rest }) => (
  <button className={classNames(styles.iconButton, className)} type="button" {...rest}>
    <Icon icon={icon} />
    {label ? <span>{label}</span> : null}
  </button>
);

IconButton.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
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

export default IconButton;
