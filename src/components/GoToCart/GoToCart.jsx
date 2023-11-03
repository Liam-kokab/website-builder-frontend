'use client';

import PropTypes from 'prop-types';
import { useCart } from '@/helpers/Providers/CartProvider';
import { getHref } from '@/helpers/getHref';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import styles from './GoToCart.module.scss';

const GoToCart = ({ buttonText, showCartButton, lang, isDefaultLang }) => {
  const { count } = useCart();

  if (showCartButton === 'never' || (showCartButton === 'onlyIfItems' && count === 0)) return null;

  const href = getHref('internalExtra', 'checkout', isDefaultLang, lang);

  return (
    <a href={href}>
      <Button className={styles.goToCartButton} primary disabled={!count}>
        <i data-count={count} className={styles.iconContainer}>
          <Icon icon={faCartShopping} size="2x" />
        </i>
        <span>{buttonText}</span>
      </Button>

    </a>
  );
};

GoToCart.propTypes = {
  buttonText: PropTypes.string.isRequired,
  showCartButton: PropTypes.oneOf(['always', 'onlyIfItems', 'never']).isRequired,
  lang: PropTypes.string.isRequired,
  isDefaultLang: PropTypes.bool.isRequired,
};

export default GoToCart;
