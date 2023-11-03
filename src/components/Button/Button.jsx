import PropTypes from 'prop-types';
import { classNames } from '@/helpers/string';
import styles from './Button.module.scss';

const Button = ({ className = '', primary = false, submit = false, loading = false, children, ...rest }) => (
  <button
    className={classNames(
      styles.button,
      className,
      primary ? styles.primary : '',
      loading ? styles.loading : '',
    )}
    type={submit ? 'submit' : 'button'}
    {...rest}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  submit: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
