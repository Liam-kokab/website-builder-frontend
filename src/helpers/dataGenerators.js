import { getPagesParams, getPageMetadata } from './sanity';

/**
 * @param pageType {'page' | 'post' | 'product'}
 * @param useDefaultLang {boolean}
 * @return {function}
 */
export const getGenerateStaticParamsFunc = (pageType = 'page', useDefaultLang = true) => async () => {
  const { items = [], defaultLang, availableLangCodes = [] } = await getPagesParams(pageType);

  return availableLangCodes
    .filter((lang) => (useDefaultLang ? lang === defaultLang : lang !== defaultLang))
    .flatMap((lang) => items.filter(({ status }) => status === 'available').map(({ slug }) => ({
      ...(pageType === 'page' ? { page: (!useDefaultLang && slug === 'index') ? 'h' : slug } : {}),
      ...(pageType === 'post' ? { post: slug } : {}),
      ...(pageType === 'product' ? { product: slug } : {}),
      ...(useDefaultLang ? {} : { lang }),
    })));
};

/**
 * @param pageType {'page' | 'post' | 'product'}
 * @param isIndex {boolean = false}
 * @return {function}
 */
export const getGenerateMetadataFunc = (pageType = 'page', isIndex = false) => async ({ params }) => {
  const { lang, page, post, product } = params;
  const slug = (isIndex || page === 'h') ? 'index' : page || post || product || '';

  const { item, pageNamePrefix, defaultLang } = await getPageMetadata(pageType, slug);
  const currentLang = lang || defaultLang;
  const pageTitle = item?.shortTitle?.[currentLang] || item?.title?.[currentLang] || '';
  const prefix = pageNamePrefix[currentLang] || '';

  return {
    title: item.slug === 'index' && pageType === 'page' ? prefix : `${prefix} - ${pageTitle}`,
  };
};
