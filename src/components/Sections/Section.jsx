import PropTypes from 'prop-types';
import Content from '@/components/Contents/Content';
import styles from './Sections.module.scss';

const Section = ({ contents, layout }) => {
  const parts = layout.split('-');
  const availableContests = contents.slice(0, parts.length);
  const layoutStyle = { '--section-layout': parts.join(' ') };

  return (
    <div style={layoutStyle} className={styles.section}>
      {
        availableContests.map((content, index) => (
          <Content key={`content_${index}`} content={content} partSize={parts[index]} />
        ))
      }
    </div>
  );
};

Section.propTypes = {
  layout: PropTypes.string.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
};

export default Section;
