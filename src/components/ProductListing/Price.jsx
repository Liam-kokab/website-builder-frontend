import PropTypes from 'prop-types';
import styles from './ProductListing.module.scss';

const Price = ({ price = {}, currencySettings, lang }) => {
  const { defaultCurrency } = currencySettings;

  // const currencies = Object.keys(currencySettings)
  //   .filter((key) => key.startsWith('enable_') && currencySettings[key] === true)
  //   .map((key) => key.replace('enable_', ''));

  const formattedPrice = new Intl.NumberFormat(lang, { style: 'currency', currency: defaultCurrency }).format(price[defaultCurrency]);

  return (
    <div className={styles.price}>
      <h3>{formattedPrice}</h3>
      {/* <span className={styles.currency}> */}
      {/*   { */}
      {/*     currencies.filter((currency) => currency !== defaultCurrency).map((currency = '') => { */}
      {/*       const currentFormattedPrice = new Intl.NumberFormat(lang, { style: 'currency', currency }).format(price[currency] || 50); */}
      {/*       return (<span key={currency}>{currentFormattedPrice}</span>); */}
      {/*     }) */}
      {/*   } */}
      {/* </span> */}
    </div>
  );
};

Price.propTypes = {
  lang: PropTypes.string.isRequired,
  price: PropTypes.shape({}),
  currencySettings: PropTypes.shape({
    defaultCurrency: PropTypes.string,
  }).isRequired,
};

export default Price;
