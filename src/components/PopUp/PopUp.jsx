/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import PropTypes from 'prop-types';
import { classNames } from '@/helpers/string';
import styles from './PopUp.module.scss';

const PopUp = ({ show = false, className = '', children, onClose }) => (show
  ? (
    <div className={styles.popup} onClick={onClose}>
      <div className={classNames(styles.popupInner, className)} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
  : null
);

/* eslint-enable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

PopUp.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopUp;
