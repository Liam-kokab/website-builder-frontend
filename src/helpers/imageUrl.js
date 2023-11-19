import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const imageBuilder = imageUrlBuilder({
  projectId,
  dataset,
});

export const urlFor = (source) => imageBuilder.image(source).auto('format');
