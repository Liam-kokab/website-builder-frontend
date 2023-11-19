import PropTypes from 'prop-types';
import Link from 'next/link';
import { urlFor } from '@/helpers/imageUrl';
import { getHref } from '@/helpers/getHref';
import Price from './Price';
import Buy from './Buy';
import styles from './ProductListing.module.scss';

const imageWidth = 250;

const ProductTable = ({ products = [], lang, isDefaultLang, currencySettings }) => (
  <div className={styles.productTable}>
    {
      products
        .filter(({ status }) => status === 'available')
        .map(({ title, shortTitle, slug, mainImage, description, price }, index) => (
          <span className={styles.productTableRow} key={`${slug}-${index}`}>
            {
              mainImage?.asset
                ? (
                  <Link
                    className={styles.imageContainer}
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
            <Link className={styles.titleDescription} href={getHref('internalProduct', slug, isDefaultLang, lang)}>
              <h2>{shortTitle || title}</h2>
              <p>{description ?? ''}</p>
            </Link>

            <Price price={price} currencySettings={currencySettings} lang={lang} />
            <Buy productId={slug} />
          </span>
        ))
    }
  </div>
);

ProductTable.propTypes = {
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
  currencySettings: PropTypes.shape({}).isRequired,
};

export default ProductTable;
