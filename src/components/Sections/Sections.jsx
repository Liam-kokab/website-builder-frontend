import PropTypes from 'prop-types';
import Section from '@/components/Sections/Section';
import styles from './Sections.module.scss';

const Sections = ({ sections }) => (
  <div className={styles.sections}>
    {
      sections.filter(Boolean).map(({ layout, contents }, index) => (
        <div key={`section_${index}`}>
          <Section contents={contents} layout={layout} />
        </div>
      ))
    }
  </div>
);

Sections.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    layout: PropTypes.string.isRequired,
  })).isRequired,
};

export default Sections;
