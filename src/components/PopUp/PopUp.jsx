import PropTypes from 'prop-types';
import { classNames } from '@/helpers/string';
import styles from './PopUp.module.scss';

const PopUp = ({ show = false, className = '', children }) => (show
  ? (
    <div className={styles.popup}>
      <div className={classNames(styles.popupInner, className)}>
        {children}
      </div>
    </div>
  )
  : null
);

PopUp.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PopUp;
