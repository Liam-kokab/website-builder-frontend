import BlockContent from '@sanity/block-content-to-react';
import CustomLink from '@/components/Contents/CustomLink';
import styles from './content.module.scss';

const serializers = {
  marks: {
    center: (props) => <div className={styles.center}>{props.children}</div>,
    link: CustomLink,
  },
};

const StyledBlockContent = ({ ...rest }) => (
  <div className={styles.blockContent}>
    <BlockContent
      {...rest}
      serializers={serializers}
    />
  </div>
);
export default StyledBlockContent;
