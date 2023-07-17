import StyledBlockContent from '@/components/BlockContent/BlockContent';
import ImageGroup from '@/components/Images/ImageGroup';
import PropTypes from 'prop-types';
import Video from '@/components/Video/Video';
import Blog from '@/components/Blog/Blog';
import CustomImage from '@/components/Images/CustomImage';

const Content = ({ content, partSize }) => {
  switch (content.itemType) {
    case 'blockContentWithLang': return <StyledBlockContent {...content} partSize={partSize} />;

    case 'empty': return <div />;

    case 'customImage': return <CustomImage {...content} partSize={partSize} />;

    case 'imageGroup': return <ImageGroup {...content} partSize={partSize} />;

    case 'blogSectionType': return <Blog {...content} />;

    case 'video': return <Video {...content} />;

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
