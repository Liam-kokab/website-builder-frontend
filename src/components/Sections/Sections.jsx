import PropTypes from 'prop-types';
import Section from '@/components/Sections/Section';
import styles from './Sections.module.scss';

const Sections = ({ sections = [], lang, isDefaultLang }) => (
  <div className={styles.sections}>
    {
      (sections || []).filter((section) => !!section?.enabled).map(({ layout, contents }, index) => (
        <div key={`section_${index}`} className={styles.sectionContainer}>
          <Section contents={contents} layout={layout} lang={lang} isDefaultLang={isDefaultLang} />
        </div>
      ))
    }
  </div>
);

Sections.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    layout: PropTypes.string.isRequired,
  })),
  lang: PropTypes.string.isRequired,
  isDefaultLang: PropTypes.bool.isRequired,
};

export default Sections;
