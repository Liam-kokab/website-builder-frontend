'use client';

import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { getPageTypeFromHref, removeLangFromPath, getHref, getSlugFromHref } from '@/helpers/getHref';
import { getLangName } from '@/helpers/language';

const getUpperCaseFirstLetter = (str = '') => str.charAt(0).toUpperCase() + str.slice(1);

const LanguageSwitcher = ({ languages, defaultLanguage, currentLang, className = '' }) => {
  const [selectedLang, setSelectedLang] = useState(currentLang || defaultLanguage || '');

  const onChange = useCallback(({ target }) => {
    const { pathname } = window.location;
    const pagePath = removeLangFromPath(pathname);
    const pageType = getPageTypeFromHref(pagePath);
    window.location.pathname = getHref(pageType, getSlugFromHref(pagePath), target.value === defaultLanguage, target.value);

    setSelectedLang(target.value);
  }, [defaultLanguage]);

  return (
    <select value={selectedLang} onChange={onChange} className={className}>
      {
        languages.map((lang = '', index) => (
          <option key={`${lang}-${index}`} value={lang}>
            {getUpperCaseFirstLetter(getLangName(lang))}
          </option>
        ))
      }
    </select>
  );
};

LanguageSwitcher.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultLanguage: PropTypes.string.isRequired,
  currentLang: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default LanguageSwitcher;
