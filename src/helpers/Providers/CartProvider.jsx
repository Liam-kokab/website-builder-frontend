'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();
export const CHANGE_PRODUCT_COUNT_IN_CART = 'CHANGE_PRODUCT_COUNT_IN_CART';
export const SET_PRODUCTS_IN_CART = 'SET_PRODUCTS_IN_CART';
export const PRODUCTS_IN_CART = 'PRODUCTS_IN_CART';
export const SET_LOADED = 'SET_LOADED';

const getCartFromStorage = () => {
  try {
    if (window.localStorage) {
      return JSON.parse(window.localStorage.getItem(PRODUCTS_IN_CART) || '[]');
    }
  } catch (error) {
    console.error(error);
  }

  return [];
};

const initialState = {
  productsInCart: [],
  loaded: false,
};

const setProductsToStorage = (productsInCart) => {
  try {
    if (window.localStorage) {
      window.localStorage.setItem(PRODUCTS_IN_CART, JSON.stringify(productsInCart));
    }
  } catch (error) {
    console.error(error);
  }
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case CHANGE_PRODUCT_COUNT_IN_CART: {
      const { productsInCart: prevProductsInCart } = state;
      const { count: prevCount = 0 } = prevProductsInCart.find(({ id }) => id === payload.id) || {};

      const productsInCart = [
        ...prevProductsInCart.filter(({ id }) => id !== payload.id),
        { id: payload.id, count: Math.max(prevCount + payload.count, 0) },
      ].filter(({ count }) => count > 0);

      setProductsToStorage(productsInCart);

      return { ...state, productsInCart };
    }
    case SET_PRODUCTS_IN_CART: {
      const { productsInCart } = payload;
      setProductsToStorage(productsInCart);
      return { ...state, productsInCart };
    }
    case SET_LOADED: {
      const { loaded } = payload;
      return { ...state, loaded };
    }
    default: throw new Error(`action ${type} does not exist`);
  }
};

export const useProduct = (id = '') => {
  const [state, dispatch] = useContext(Context);

  return {
    count: state.productsInCart.find(({ id: productId }) => productId === id)?.count || 0,
    AddOne: useCallback(() => dispatch({ type: CHANGE_PRODUCT_COUNT_IN_CART, payload: { id, count: 1 } }), [dispatch, id]),
    RemoveOne: useCallback(() => dispatch({ type: CHANGE_PRODUCT_COUNT_IN_CART, payload: { id, count: -1 } }), [dispatch, id]),
  };
};

export const useCart = () => {
  const [state, dispatch] = useContext(Context);

  return {
    count: state.productsInCart.reduce((acc, item) => acc + item.count, 0),
    all: state.productsInCart,
    clear: useCallback(() => dispatch({ type: SET_PRODUCTS_IN_CART, payload: { productsInCart: [] } }), [dispatch]),
    hasLoaded: state.loaded,
  };
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const productsInCart = getCartFromStorage();
    dispatch({ type: SET_PRODUCTS_IN_CART, payload: { productsInCart } });
    dispatch({ type: SET_LOADED, payload: { loaded: true } });
  }, []);

  return (
    <Context.Provider value={useMemo(() => [state, dispatch], [state, dispatch])}>
      {children}
    </Context.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
