import StyledBlockContent from '@/components/BlockContent/BlockContent';
import ImageGroup from '@/components/Images/ImageGroup';
import PropTypes from 'prop-types';

const Content = ({ content, partSize }) => {
  switch (content.itemType) {
    case 'blockContentWithLang': return <StyledBlockContent {...content} partSize={partSize} />;

    case 'empty': return <div>Comming soon empty</div>;

    case 'customImage': return <div>Comming soon customImage</div>;

    case 'imageGroup': return <ImageGroup {...content} partSize={partSize} />;

    case 'blogSectionType': return <div>Comming soon blogSectionType</div>;

    case 'video': return <div>Comming soon video</div>;

    default: return <div>unknown</div>;
  }
};

Content.defaultProps = {
  content: {},
};

Content.propTypes = {
  content: PropTypes.shape({
    itemType: PropTypes.string.isRequired,
  }),
  partSize: PropTypes.string.isRequired,
};

export default Content;
