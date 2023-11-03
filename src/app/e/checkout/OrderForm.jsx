'use client';

import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import { getHref } from '@/helpers/getHref';
import { getLangName } from '@/helpers/language';
import { useCart } from '@/helpers/Providers/CartProvider';
import { urlFor } from '@/helpers/sanity';

import PopUp from '@/components/PopUp/PopUp';
import Icon from '@/components/Icon/Icon';
import Button from '@/components/Button/Button';

import styles from './checkout.module.scss';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (field, value, defaultLang, currentLang) => {
  const { isRequired, errorMessage, type } = field;
  const isValueValid = type === 'email' ? EMAIL_REGEX.test(value) : true;
  if (!isRequired) return '';
  return (!value || !isValueValid)
    ? (errorMessage?.[currentLang] || errorMessage[defaultLang] || '')
    : '';
};

const sendRequest = async (url, values, allProducts, products, currencySettings) => {
  try {
    const currentProducts = allProducts
      .map(({ id, count }) => {
        const product = products.find(({ slug }) => slug === id);
        return {
          title: product.shortTitle || product.title,
          img: urlFor(product.mainImage).url(),
          slug: product.slug,
          price: product.price[currencySettings.defaultCurrency],
          quantity: count,
        };
      })
      .filter((product) => !!product?.slug)
      .sort((a, b) => a.title.localeCompare(b.title));

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailType: 'PERCHES',
        userDerails: values,
        payload: currentProducts,
      }),
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }

  return null;
};

const OrderForm = ({
  fields = [],
  backendUrl,
  defaultLang,
  currentLang,
  products = [],
  currencySettings,
  submitButtonText,
  successMessage,
  errorMessage,
  isDefaultLang,
}) => {
  const { all: allProducts = [], clear: cleatCart } = useCart();

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const hasErrors = Object.keys(formErrors).filter((key) => !!formErrors[key]).length;
  const popUpMessage = result ? successMessage : errorMessage;

  const handleInputChange = useCallback((e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    const field = fields.find((f) => f.title[defaultLang] === name);
    setFormErrors((prev) => ({ ...prev, [name]: validateField(field, newValue, defaultLang, currentLang) }));
  }, [currentLang, defaultLang, fields]);

  const onBlur = useCallback((e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === 'checkbox' ? checked : value;
    const field = fields.find((f) => f.title[defaultLang] === name);
    setFormErrors((prev) => ({ ...prev, [name]: validateField(field, newValue, defaultLang, currentLang) }));
  }, [currentLang, defaultLang, fields]);

  const onSubmit = useCallback(async () => {
    const errors = {};
    const values = {};

    fields.forEach((field) => {
      const { title } = field;
      const value = formData[title[defaultLang]];
      const fieldError = validateField(field, value, defaultLang, currentLang);
      if (fieldError) {
        errors[title[defaultLang]] = fieldError;
      } else {
        values[title[defaultLang]] = value || '';
      }
    });

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    const { ok } = await sendRequest(
      `${backendUrl}/send`,
      { ...values, 'user language': getLangName(currentLang) },
      allProducts,
      products,
      currencySettings,
    ) || {};

    setResult(ok);

    setLoading(false);
  }, [allProducts, backendUrl, currencySettings, currentLang, defaultLang, fields, formData, products]);

  const onCompleted = useCallback(({ target }) => {
    if (target.dataset.status === 'success') {
      cleatCart();
      setFormErrors({});
      setFormData({});
      window.location.pathname = getHref('index', 'index', isDefaultLang, currentLang);
    }

    setResult(null);
  }, [cleatCart, currentLang]);

  return (
    <form className={styles.formContainer}>
      <div className={styles.formFields}>
        {
          fields.map(({ title, type }) => (
            <div className={`${styles.formField}`} key={title[defaultLang]}>
              <div className={`${styles.formField} ${styles[type]}`}>
                <label htmlFor={title[defaultLang]}>{title[currentLang]}</label>
                <input
                  type={type}
                  id={title[defaultLang]}
                  name={title[defaultLang]}
                  placeholder={title[currentLang]}
                  onChange={handleInputChange}
                  disabled={loading}
                  value={formData[title[defaultLang]] || ''}
                  onBlur={onBlur}
                />
              </div>
              <span className={styles.error}>{formErrors[title[defaultLang]] || ''}</span>
            </div>
          ))
        }
      </div>

      <div className={styles.buttonContainer}>
        <Button
          primary
          onClick={onSubmit}
          disabled={loading || hasErrors}
          loading={loading}
        >
          {submitButtonText}
        </Button>
      </div>

      <PopUp show={result !== null} className={styles.popUpContainer}>
        <Icon icon={result ? faCircleCheck : faCircleExclamation} />
        <div className={styles.popUpText}>
          { popUpMessage?.split('\n').map((text, index) => <p key={`pm-${index}`}>{text}</p>) }
        </div>
        <Button
          primary
          onClick={onCompleted}
          data-status={result ? 'success' : 'error'}
        >
          OK
        </Button>
      </PopUp>
    </form>
  );
};

OrderForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.objectOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    errorMessage: PropTypes.objectOf(PropTypes.string),
  })),
  backendUrl: PropTypes.string.isRequired,
  defaultLang: PropTypes.string.isRequired,
  currentLang: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    mainImage: PropTypes.shape({
      asset: PropTypes.shape({}),
    }),
    price: PropTypes.shape({}),
    shortTitle: PropTypes.string,
    slug: PropTypes.string,
    status: PropTypes.oneOf(['available', 'disabled', 'hidden']),
    stock: PropTypes.number,
    title: PropTypes.string,
  })),
  currencySettings: PropTypes.shape({}).isRequired,
  submitButtonText: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isDefaultLang: PropTypes.bool.isRequired,
};

export default OrderForm;
