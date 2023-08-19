/**
 * retuns href for based on linkType and slug
 * @param linkType {'internalPage' | 'internalProduct' | 'internalPost' | 'external' | 'index'}
 * @param slug {string}
 * @param isDefaultLang {boolean}
 * @param langCode {string}
 * @param externalLinkUrl {string}
 * @return {string}
 */
export const getHref = (linkType, slug, isDefaultLang, langCode, externalLinkUrl = '') => {
  const hrefStart = isDefaultLang ? '' : `/l/${langCode}`;
  const indexHref = isDefaultLang ? '/' : `/l/${langCode}/s/h`;

  switch (linkType) {
    case 'index':
      return indexHref;
    case 'internalPage':
      return slug === 'index' ? indexHref : `${hrefStart}/s/${slug}`;
    case 'internalProduct':
      return `${hrefStart}/p/${slug}`;
    case 'internalPost':
      return `${hrefStart}/b/${slug}`;
    case 'external':
      return externalLinkUrl;
    default:
      return '/';
  }
};

/**
 *
 * @param href
 * @return {'internalPage' | 'internalProduct' | 'internalPost' | 'external' | 'index'}
 */
export const getPageTypeFromHref = (href = '') => {
  if (href === '/' || href.includes('/s/h')) return 'index';
  if (href.includes('/s/')) return 'internalPage';
  if (href.includes('/p/')) return 'internalProduct';
  if (href.includes('/b/')) return 'internalPost';
  return 'external';
};

export const getSlugFromHref = (href = '') => {
  const pageType = getPageTypeFromHref(href);
  if (pageType === 'index') return 'index';
  if (pageType === 'external') return '';
  return href.split('/').at(-1);
};

/**
 * removers /l/{lang}/ from pathname if it exists
 * @param pathname
 */
export const removeLangFromPath = (pathname) => {
  const langRegex = /\/l\/\w{2}\//;
  return pathname.replace(langRegex, '/');
};
