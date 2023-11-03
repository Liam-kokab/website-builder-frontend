import PropTypes from 'prop-types';

import PageLayout from '@/components/PageLayout/PageLayout';
import MainImage from '@/components/Images/MainImage';
import StyledBlockContent from '@/components/BlockContent/BlockContent';

import { getHref } from '@/helpers/getHref';
import { getCheckoutPage, getDefaultLangCode } from '@/helpers/sanity';
import { getGenerateMetadataFunc, getGenerateStaticParamsFunc } from '@/helpers/dataGenerators';

import OrderForm from './OrderForm';
import CheckoutProductList from './CheckoutProductList';
import styles from './checkout.module.scss';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const generateStaticParams = getGenerateStaticParamsFunc('checkout', true);
export const generateMetadata = getGenerateMetadataFunc('checkout');

const Page = async ({ params = {} }) => {
  const { lang = '' } = params;

  const defaultLang = await getDefaultLangCode();
  const currentLang = lang || defaultLang;
  const { checkoutPage, productListing, currency } = await getCheckoutPage(currentLang);
  const { submitButtonText, successMessage, beforeText, afterText, formFields, title, mainImage, errorMessage } = checkoutPage;

  return (
    <PageLayout
      href={getHref('internalProduct', 'checkout', !lang, currentLang)}
      pageName={title}
      langCode={currentLang}
      isDefaultLang={!lang}
    >
      {
        mainImage?.asset?._ref
          ? <MainImage image={mainImage} title={title} />
          : <h1 className={styles.pageTitle}>{title}</h1>
      }
      <div className={styles.blockContentContainer}>
        <div className={styles.blockContent}>
          {beforeText ? <StyledBlockContent blockContent={beforeText} partSize="12fr" /> : null}
        </div>
        <CheckoutProductList isDefaultLang={!lang} currencySettings={currency} lang={currentLang} products={productListing} />
        <OrderForm
          fields={formFields}
          defaultLang={defaultLang}
          currentLang={currentLang}
          backendUrl={backendUrl}
          currencySettings={currency}
          products={productListing}
          submitButtonText={submitButtonText}
          successMessage={successMessage}
          errorMessage={errorMessage}
          isDefaultLang={!lang}
        />
        <div className={styles.blockContent}>
          {afterText ? <StyledBlockContent blockContent={afterText} partSize="12fr" /> : null}
        </div>
      </div>
    </PageLayout>
  );
};

Page.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string,
  }),
};

export default Page;
