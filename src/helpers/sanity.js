import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { documentShearedItems, image } from '@/helpers/sanityTypes';

export const projectId = 'coxo779h';
export const dataset = 'production';

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2023-06-15',
});

const imageBuilder = imageUrlBuilder(client);
export const urlFor = (source) => imageBuilder.image(source);

export const getPosts = async () => {
  const query = `*[_type == "post"]{
    "slug": slug.current,
  }`;

  return client.fetch(query);
};

export const getPost = async (slug, langCode) => {
  const query = `*[_type == "post" && slug.current == "${slug}"] {
    ${documentShearedItems(langCode)}
  }[0]`;

  return client.fetch(query);
};

export const getProducts = async () => {
  const query = `*[_type == "product"]{
    "slug": slug.current,
  }`;

  return client.fetch(query);
};

export const getProduct = async (slug, langCode) => {
  const query = `*[_type == "product" && slug.current == "${slug}"] {
    "title": title.${langCode},
  }[0]`;

  return client.fetch(query);
};

export const getPages = async () => {
  const query = `*[_type == "page"]{
      "slug": slug.current,
      status,
  }`;

  return client.fetch(query);
};

export const getPage = async (slug, langCode) => {
  const query = `*[_type == "page" && slug.current == "${slug}"] {
    ${documentShearedItems(langCode)}
  }[0]`;

  return client.fetch(query);
};

export const getSiteSettings = async () => {
  const query = `{
    "general": *[_type == "generalSettings"][0],
    "color": *[_type == "colorSettings"][0],
    "footer": *[_type == "footerSettings"][0],
    "categories": *[_type == "categoriesSettings"][0],
    "menu": *[_type == "menuSettings"][0].menuItems[] {
      linkType,
      useDocumentTitle,
      openInNewTab,
      externalLinkUrl,
      "linkTitle": linkTitle.no,
      "title": Reference->title.no,
      "shortTitle": Reference->shortTitle.no,
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
