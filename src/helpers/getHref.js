const getHref = (linkType, slug, externalLinkUrl) => {
  switch (linkType) {
    case 'internalPage':
      return `/${slug}`;
    case 'internalProduct':
      return `/product/${slug}`;
    case 'internalPost':
      return `/post/${slug}`;
    case 'external':
      return externalLinkUrl;
    default:
      return '/';
  }
};

export default getHref;
