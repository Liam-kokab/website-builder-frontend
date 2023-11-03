'use client';

import PropTypes from 'prop-types';
import IconButton from '@/components/Icon/IconButton';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/helpers/Providers/CartProvider';
import { getHref } from '@/helpers/getHref';
import styles from './Header.module.scss';

const Cart = ({ isDefaultLang, langCode, text = '', hideable = true }) => {
  const { count } = useCart();

  return count || !hideable
    ? (
      <a className={styles.headerCart} href={getHref('internalExtra', 'checkout', isDefaultLang, langCode)}>
        <IconButton icon={faCartShopping} className={styles.cartButton} size="3x" label={text} />
        <div className={styles.cartCounter}>{count}</div>
      </a>
    )
    : null;
};

Cart.propTypes = {
  isDefaultLang: PropTypes.bool.isRequired,
  langCode: PropTypes.string.isRequired,
  text: PropTypes.string,
  hideable: PropTypes.bool,
};

export default Cart;
