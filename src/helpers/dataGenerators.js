import { getPagesParams, getPageMetadata } from './sanity';

const getDummyPage = (pageType = 'page', useDefaultLang) => {
  const object = useDefaultLang ? {} : { lang: 'null-lang' };
  switch (pageType) {
    case 'page':
      return { page: 'null-element', ...object };
    case 'post':
      return { post: 'null-element', ...object };
    case 'product':
      return { product: 'null-element', ...object };
    case 'checkout':
      return object;
    default:
      return {};
  }
};

/**
 * @param pageType {'page' | 'post' | 'product' | 'checkout'}
 * @param useDefaultLang {boolean}
 * @return {function}
 */
export const getGenerateStaticParamsFunc = (pageType = 'page', useDefaultLang = true) => async () => {
  const { items = [], defaultLang, availableLangCodes = [] } = await getPagesParams(pageType);

  // Add checkout page
  if (pageType === 'checkout') items.push({ slug: 'checkout', status: 'available' });

  const res = availableLangCodes
    .filter((lang) => (useDefaultLang ? lang === defaultLang : lang !== defaultLang))
    .flatMap((lang) => items.filter(({ status }) => status === 'available').map(({ slug }) => ({
      ...(pageType === 'page' ? { page: (!useDefaultLang && slug === 'index') ? 'h' : slug } : {}),
      ...(pageType === 'post' ? { post: slug } : {}),
      ...(pageType === 'product' ? { product: slug } : {}),
      ...(pageType === 'checkout' ? {} : {}),
      ...(useDefaultLang ? {} : { lang }),
    })));

  // If no available pages, return a dummy page, this is a bug in next.js
  return res.length ? res : [getDummyPage(pageType, useDefaultLang)];
};

/**
 * @param pageType {'page' | 'post' | 'product' | 'checkout'}
 * @param isIndex {boolean = false}
 * @return {function}
 */
export const getGenerateMetadataFunc = (pageType = 'page', isIndex = false) => async ({ params }) => {
  const { lang, page, post, product } = params;

  // this is a hack to fix a bug in next.js
  if (page === 'null-element' || post === 'null-element' || product === 'null-element') return {};

  const slug = (isIndex || page === 'h') ? 'index' : page || post || product || '';

  const { item, pageNamePrefix, defaultLang } = await getPageMetadata(pageType, slug);
  const currentLang = lang || defaultLang;
  const pageTitle = item?.shortTitle?.[currentLang] || item?.title?.[currentLang] || '';
  const prefix = pageNamePrefix[currentLang] || '';

  return {
    title: item.slug === 'index' && pageType === 'page' ? prefix : `${prefix} - ${pageTitle}`,
  };
};
