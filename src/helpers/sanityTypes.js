const MAX_ITEMS = 3;

const size = `
  width,
  placement,
  customWidth,
`;

export const image = (langCode) => `
  "title": title.${langCode},
  crop,
  hotspot,
  "description": description.${langCode},
  asset,
`;

const imageGroup = (langCode) => `
  "title": title.${langCode},
  "description": description.${langCode},
  circle,
  viewVariant,
  images[] { ${image(langCode)} },
`;

export const video = (langCode) => `
  "url": url.${langCode},
  ${size}
`;

export const blog = (langCode) => `
  count,
  blogSectionType,
  postGroup[]->{
    "title": title.${langCode},
    "shortTitle": shortTitle.${langCode},
    "slug": slug.current,
    status,
    mainImage { ${image(langCode)} },
  },
`;

export const productListing = (langCode) => `
  count,
  productGroup[]->{
    "title": title.${langCode},
    "shortTitle": shortTitle.${langCode},
    "slug": slug.current,
    "description": description.${langCode},
    price,
    stock,
    status,
    mainImage { ${image(langCode)} },
  },
`;

const contentItems = (langCode) => `
  itemType,
  "blockContent": blockContentWithLang.${langCode},
  "image": customImage { ${image(langCode)} },
  imageGroup { ${imageGroup(langCode)} },
  "blogPage": blogSectionType { ${blog(langCode)} },
  "productListing": productListing { ${productListing(langCode)} },
  video { ${video(langCode)} }
`;

export const sectionItems = (langCode) => `
  layout,
  enabled,
  "contents": [
    ${new Array(MAX_ITEMS).fill(0).map((_, index) => `content${index + 1} { ${contentItems(langCode)} },`).join('\n')}
  ], 
`;

export const documentShearedItems = (langCode) => `
  "title": title.${langCode},
  "shortTitle": shortTitle.${langCode},
  mainImage { ${image(langCode)} },
  status,
  "slug": slug.current,
  "sections": [
    ${new Array(MAX_ITEMS).fill(0).map((_, index) => `section_${index + 1} { ${sectionItems(langCode)} },`).join('\n')}
  ],
`;
