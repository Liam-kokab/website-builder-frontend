import PropTypes from 'prop-types';
import HelpText from './HelpText';
import styles from './FormFiled.module.scss';

const FormFiled = ({ onBlur, onChange, filed = {}, disabled = false, value = '', error = '' }) => {
  const { title, type, helpTextType, helpTextPopUp, helpTextTooltip } = filed;
  const key = `${type}-${title}`;

  return (
    <div className={`${styles.formField}`}>
      <div className={`${styles.formField} ${styles[type]}`}>
        <div className={styles.titleContainer}>
          <label htmlFor={key}>
            {title}
          </label>
          <HelpText helpTextType={helpTextType} helpTextPopUp={helpTextPopUp} helpTextTooltip={helpTextTooltip} />
        </div>
        <input
          type={type}
          id={key}
          name={title}
          placeholder={title}
          onChange={onChange}
          disabled={disabled}
          value={value}
          onBlur={onBlur}
        />
      </div>
      <span className={styles.error}>{error || ''}</span>
    </div>
  );
};

FormFiled.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  filed: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    helpTextType: PropTypes.string,
    helpTextTooltip: PropTypes.string,
    helpTextPopUp: PropTypes.arrayOf(PropTypes.shape({
      _key: PropTypes.string.isRequired,
      children: PropTypes.arrayOf(PropTypes.shape({
        _key: PropTypes.string.isRequired,
      })),
    })),
  }).isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  error: PropTypes.string,
};

export default FormFiled;
