import PropTypes from 'prop-types';
import CartProvider from './CartProvider';

const Providers = ({ children }) => (
  <CartProvider>
    {children}
  </CartProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
