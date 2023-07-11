import PropTypes from 'prop-types';
import Link from 'next/link';
import { getSlugByRef } from '@/helpers/sanity';
import getHref from '@/helpers/getHref';

const BlockContentLink = async ({ children, mark }) => {
  const { linkType, Reference: reference, externalLinkUrl, openInNewTab } = mark;
  const slug = reference ? await getSlugByRef(reference?._ref) : '';

  return (
    <Link
      href={getHref(linkType, slug, externalLinkUrl)}
      target={openInNewTab ? '_blank' : ''}
    >
      {children}
    </Link>
  );
};

BlockContentLink.prototype = {
  children: PropTypes.node.isRequired,
  mark: PropTypes.shape({
    linkType: PropTypes.string.isRequired,
    externalLinkUrl: PropTypes.string,
    Reference: PropTypes.shape({
      _ref: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default BlockContentLink;
