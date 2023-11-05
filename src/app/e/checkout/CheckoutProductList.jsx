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
import { classNames } from '@/helpers/string';
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
    <div className={styles.productTable}>
      {
        currentProducts.map(({ title, shortTitle, slug, mainImage, price, count }, index) => (
          <div key={`${slug}-${index}`} className={styles.productTableRow}>
            <span className={styles.productTableCell}>
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
            </span>
            <span className={classNames(styles.productTableCell, styles.productTitle)}>
              <Link className={productStyles.titleDescription} href={getHref('internalProduct', slug, isDefaultLang, lang)}>
                {shortTitle || title}
              </Link>
            </span>
            <span className={styles.productTableCell}>
              <Price price={price} currencySettings={currencySettings} lang={lang} />
            </span>
            <span className={styles.productTableCell}>
              <Buy productId={slug} />
            </span>
            <span className={styles.productTableCell}>
              <Price
                price={{ [currencySettings.defaultCurrency]: price[currencySettings.defaultCurrency] * count }}
                currencySettings={currencySettings}
                lang={lang}
              />
            </span>
          </div>
        ))
      }
      <div className={styles.productTableTotal}>
        <Price
          price={{ [currencySettings.defaultCurrency]: total }}
          currencySettings={currencySettings}
          lang={lang}
        />
      </div>
    </div>
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
