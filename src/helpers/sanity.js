import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { documentShearedItems, image } from '@/helpers/sanityTypes';

export const projectId = process.env.SANITY_PROJECT_ID || 'coxo779h';
export const dataset = process.env.SANITY_DATASET || 'production';

export const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2023-06-15',
});

const imageBuilder = imageUrlBuilder(client);
export const urlFor = (source) => imageBuilder.image(source);

/**
 * Get all pages
 * @return {Promise<{ items: [{ slug: string, status: ('available'|'disabled'|'hidden') }], defaultLang: string, availableLangCodes: [string] }>}
 */
export const getPagesParams = async (pageType) => {
  const query = `{
    ${pageType === 'page' ? '"items": *[_type == "page"]{ "slug": slug.current, status },' : ''}
    ${pageType === 'post' ? '"items": *[_type == "post"]{ "slug": slug.current, status },' : ''}
    ${pageType === 'product' ? '"items": *[_type == "product"]{ "slug": slug.current, status },' : ''}
    "allLangCodes": *[_type == "languageSettings"][0],
    "defaultLang": *[_type == "languageSettings"][0].defaultLanguage,
  }`;

  const res = await client.fetch(query);
  const availableLangCodes = Object.keys(res.allLangCodes)
    .filter((key) => key.startsWith('enable_') && res.allLangCodes[key])
    .map((key) => key.replace('enable_', ''));

  return { ...res, availableLangCodes };
};

/**
 * Get a page metadata
 * @return {Promise<{ item: { slug: string, title: string, shortTitle: string }, defaultLang: string, availableLangCodes: [string], pageNamePrefix: {[key: string]: string} }>}
 */
export const getPageMetadata = async (pageType, slug) => {
  const query = `{
    ${pageType === 'page' ? `"item": *[_type == "page" && slug.current == "${slug}"][0]{ "slug": slug.current, title, shortTitle },` : ''}
    ${pageType === 'post' ? `"item": *[_type == "post" && slug.current == "${slug}"][0]{ "slug": slug.current, title, shortTitle },` : ''}
    ${pageType === 'product' ? `"item": *[_type == "product" && slug.current == "${slug}"][0]{ "slug": slug.current, title, shortTitle },` : ''}
    ${pageType === 'checkout' ? '"item": *[_type == "checkoutFormSettings"][0]{ title },' : ''}
    "pageNamePrefix": *[_type == "generalSettings"][0].pageNamePrefix,
    "allLangCodes": *[_type == "languageSettings"][0],
    "defaultLang": *[_type == "languageSettings"][0].defaultLanguage,
  }`;

  const res = await client.fetch(query);
  const availableLangCodes = Object.keys(res.allLangCodes)
    .filter((key) => key.startsWith('enable_') && res.allLangCodes[key])
    .map((key) => key.replace('enable_', ''));

  return { ...res, availableLangCodes };
};

export const getPage = async (slug, langCode) => {
  const query = `*[_type == "page" && slug.current == "${slug}"] {
    ${documentShearedItems(langCode)}
  }[0]`;

  return client.fetch(query);
};

export const getPost = async (slug, langCode) => {
  const query = `*[_type == "post" && slug.current == "${slug}"] {
    ${documentShearedItems(langCode)}
  }[0]`;

  return client.fetch(query);
};

export const getProduct = async (slug, langCode) => {
  const query = `*[_type == "product" && slug.current == "${slug}"] {
    "description": description.${langCode},
    price,
    "images": imageGroup[] {
      "title": title.${langCode},
      crop,
      hotspot,
      "description": description.${langCode},
      asset,  
    },
    ${documentShearedItems(langCode)}
  }[0]`;

  return client.fetch(query);
};

export const getSiteSettings = async (langCode) => {
  const query = `{
    "currency": *[_type == "currencySettings"][0],
    "general": *[_type == "generalSettings"][0]{
      "tags": tags[].${langCode},
      "title": pageNamePrefix.${langCode},  
    },
    "color": *[_type == "colorSettings"][0],
    "footer": *[_type == "footerSettings"][0],
    "categories": *[_type == "categoriesSettings"][0],
    "menu": *[_type == "menuSettings"][0].menuItems[] {
      linkType,
      useDocumentTitle,
      openInNewTab,
      externalLinkUrl,
      "linkTitle": linkTitle.${langCode},
      "title": Reference->title.${langCode},
      "shortTitle": Reference->shortTitle.${langCode},
      "slug": Reference->slug.current,
      "status": Reference->status,
      _key,
    },
  }`;

  return client.fetch(query);
};

export const getSlugByRef = async (ref) => {
  if (!ref) return '';
  return client.fetch(`*[_id == "${ref}"][0].slug.current`);
};

export const getNewestPosts = async (langCode) => {
  const query = `*[_type == "post" && status == 'available'] | order(_createdAt desc) {
    "title": title.${langCode},
    "shortTitle": shortTitle.${langCode},
    "slug": slug.current,
    mainImage { ${image(langCode)} },
    status,
  }`;

  return client.fetch(query);
};

export const getDefaultLangCode = async () => {
  const query = '*[_type == "languageSettings"][0].defaultLanguage';
  return client.fetch(query);
};

export const getAvailableLangCodes = async () => {
  const query = '*[_type == "languageSettings"][0]';
  const res = await client.fetch(query);
  return Object.keys(res)
    .filter((key) => key.startsWith('enable_') && res[key])
    .map((key) => key.replace('enable_', ''));
};

export const getCheckoutPage = async (langCode) => {
  const query = `{
    "checkoutPage": *[_type == "checkoutFormSettings"][0] {
      "title": title.${langCode},
      mainImage { ${image(langCode)} },
      "errorMessage": errorMessage.${langCode},
      "submitButtonText": submitButtonText.${langCode},
      "successMessage": successMessage.${langCode},
      "beforeText": beforeText.${langCode},
      "afterText": afterText.${langCode},
      formFields[] {
        "title": title,
        "errorMessage": errorMessage,
        type,
        isRequired
      },
    },
    "productListing": *[_type == "product"] {
      "title": title.${langCode},
      "shortTitle": shortTitle.${langCode},
      "slug": slug.current,
      "description": description.${langCode},
      price,
      stock,
      status,
      mainImage { ${image(langCode)} },
    },
    "currency": *[_type == "currencySettings"][0],
  }`;

  return client.fetch(query);
};
