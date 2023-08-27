'use client';

import PropTypes from 'prop-types';
import { useCart } from '@/helpers/Providers/CartProvider';
import styles from './ProductListing.module.scss';

const Buy = ({ productId }) => {
  const { AddOne, RemoveOne, count } = useCart(productId);

  return (
    <div className={styles.buy}>
      <button type="button" onClick={RemoveOne}>-</button>
      <span className={styles.count}>{count}</span>
      <button type="button" onClick={AddOne}>+</button>
    </div>
  );
};

Buy.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default Buy;
