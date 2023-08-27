import PropTypes from 'prop-types';
import styles from './ProductListing.module.scss';

const Price = ({ price = {}, currencySettings, lang }) => {
  const { defaultCurrency } = currencySettings;

  const currencies = Object.keys(currencySettings)
    .filter((key) => key.startsWith('enable_') && currencySettings[key] === true)
    .map((key) => key.replace('enable_', ''));

  const formattedPrice = new Intl.NumberFormat(lang, { style: 'currency', currency: defaultCurrency }).format(price[defaultCurrency]);

  return (
    <div>
      <h3 className={styles.shownPrice}>{formattedPrice}</h3>
      <span className={styles.hiddenPrice}>
        {
          currencies.map((currency = '') => {
            const currentFormattedPrice = new Intl.NumberFormat(lang, { style: 'currency', currency }).format(price[currency]);
            return (<h4 key={currency}>{currentFormattedPrice}</h4>);
          })
        }
      </span>
    </div>

  );
};

Price.propTypes = {
  lang: PropTypes.string.isRequired,
  price: PropTypes.objectOf(PropTypes.string),
  currencySettings: PropTypes.shape({
    defaultCurrency: PropTypes.string,
  }).isRequired,
};

export default Price;
