'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Icon from '@/components/Icon/Icon';
import PopUp from '@/components/PopUp/PopUp';
import Button from '@/components/Button/Button';
import BlockContent from '@/components/BlockContent/BlockContent';
import styles from './FormFiled.module.scss';

const HelpText = ({ helpTextType = 'none', helpTextTooltip = '', helpTextPopUp = [] }) => {
  const [show, setShow] = useState(false);

  if (helpTextType === 'tooltip') {
    return (
      <span className={styles.helpText}>
        <button type="button" className={styles.toolTipButton} aria-label="close">
          <Icon icon={faCircleExclamation} className={styles.toolTipButton} />
        </button>
        <div className={styles.tooltipText}>
          {helpTextTooltip}
        </div>
      </span>
    );
  }

  if (helpTextType === 'popUp') {
    const closePopUp = () => setShow((prevState) => !prevState);

    return (
      <span className={styles.helpText}>
        <button type="button" className={styles.toolTipButton} onClick={closePopUp} aria-label="close">
          <Icon icon={faCircleExclamation} className={styles.toolTipButton} />
        </button>
        <PopUp show={show} onClose={closePopUp}>
          <BlockContent
            className={styles.popUpContent}
            blockContent={helpTextPopUp}
          />
          <div className={styles.buttonsContainer}>
            <Button onClick={closePopUp} primary>OK</Button>
          </div>
        </PopUp>
      </span>
    );
  }

  return null;
};

HelpText.propTypes = {
  helpTextType: PropTypes.oneOf(['', 'none', 'tooltip', 'popUp', null]),
  helpTextTooltip: PropTypes.string,
  helpTextPopUp: PropTypes.arrayOf(PropTypes.shape({
    _key: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      _key: PropTypes.string.isRequired,
    })),
  })),
};

export default HelpText;
