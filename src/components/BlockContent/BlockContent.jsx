import { PortableText } from '@portabletext/react';
// import BlockContentLink from '@/components/BlockContent/BlockContentLink';
import PropTypes from 'prop-types';
import { classNames } from '@/helpers/string';
import styles from './BlockContent.module.scss';

const components = {
  marks: {
    center: (props) => <div className={styles.center}>{props.children}</div>,
    // link: BlockContentLink,
  },
};

const BlockContent = ({ blockContent = [], className = '' }) => (
  <div className={classNames(styles.blockContent, className)}>
    <PortableText
      value={blockContent}
      components={components}
    />
  </div>
);

BlockContent.propTypes = {
  blockContent: PropTypes.arrayOf(PropTypes.shape({
    _key: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      _key: PropTypes.string.isRequired,
    })),
  })),
  className: PropTypes.string,
};

export default BlockContent;
