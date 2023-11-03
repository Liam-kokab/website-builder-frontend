'use client';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useCart } from '@/helpers/Providers/CartProvider';
import { getHref } from '@/helpers/getHref';
import { urlFor } from '@/helpers/sanity';
import Price from '@/components/ProductListing/Price';
import Buy from '@/components/ProductListing/Buy';
import productStyles from '@/components/ProductListing/ProductListing.module.scss';
import styles from './checkout.module.scss';

const imageWidth = 100;

const CheckoutProductList = ({ products = [], lang, isDefaultLang, currencySettings }) => {
  const { all = [], count: productCount, hasLoaded } = useCart();
  const currentProducts = all
    .map(({ id, count }) => ({ ...products.find(({ slug }) => slug === id), count }))
    .filter((product) => !!product?.slug)
    .sort((a, b) => a.title.localeCompare(b.title));

  const total = currentProducts.reduce((acc, { price, count }) => {
    const currentPrice = price[currencySettings.defaultCurrency] * count;
    return acc + currentPrice;
  }, 0);

  useEffect(() => {
    if (productCount < 1 && hasLoaded) {
      window.location.pathname = getHref('index', 'index', isDefaultLang, lang);
    }
  }, [isDefaultLang, hasLoaded, lang, productCount]);

  if (productCount < 1) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading} />
      </div>
    );
  }

  return (
    <table className={styles.productTable}>
      <tbody>
        {
          currentProducts.map(({ title, shortTitle, slug, mainImage, price, count }, index) => (
            <tr key={`${slug}-${index}`}>
              <td>
                {
                  mainImage?.asset
                    ? (
                      <Link
                        className={productStyles.imageContainer}
                        href={getHref('internalProduct', slug, isDefaultLang, lang)}
                      >
                        <img
                          src={urlFor(mainImage).width(imageWidth).height(Math.round((imageWidth * 9) / 16)).url()}
                          alt={mainImage.title}
                        />
                      </Link>
                    )
                    : <div />
                }
              </td>
              <td>
                <Link className={productStyles.titleDescription} href={getHref('internalProduct', slug, isDefaultLang, lang)}>
                  {shortTitle || title}
                </Link>
              </td>
              <td>
                <Price price={price} currencySettings={currencySettings} lang={lang} />
              </td>
              <td>
                <Buy productId={slug} />
              </td>
              <td>
                <Price
                  price={{ [currencySettings.defaultCurrency]: price[currencySettings.defaultCurrency] * count }}
                  currencySettings={currencySettings}
                  lang={lang}
                />
              </td>
            </tr>
          ))
        }
        <tr>
          <td colSpan="5">
            <Price
              price={{ [currencySettings.defaultCurrency]: total }}
              currencySettings={currencySettings}
              lang={lang}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

CheckoutProductList.propTypes = {
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
  lang: PropTypes.string.isRequired,
  isDefaultLang: PropTypes.bool.isRequired,
  currencySettings: PropTypes.shape({
    defaultCurrency: PropTypes.string,
    currencies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CheckoutProductList;
