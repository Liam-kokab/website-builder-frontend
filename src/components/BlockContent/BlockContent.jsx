import BlockContent from '@sanity/block-content-to-react';
import BlockContentLink from '@/components/BlockContent/BlockContentLink';
import PropTypes from 'prop-types';
import styles from './content.module.scss';

const serializers = {
  marks: {
    center: (props) => <div className={styles.center}>{props.children}</div>,
    link: BlockContentLink,
  },
};

const StyledBlockContent = async ({ blockContent }) => (
  <div className={styles.blockContent}>
    <BlockContent
      serializers={serializers}
      blocks={blockContent}
    />
  </div>
);

StyledBlockContent.defaultProps = {
  blockContent: [],
};

StyledBlockContent.propTypes = {
  blockContent: PropTypes.arrayOf(PropTypes.shape({
    _key: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      _key: PropTypes.string.isRequired,
    })),
  })),
};

export default StyledBlockContent;
