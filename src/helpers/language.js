export const getLangName = (lang) => new Intl.DisplayNames([lang], {
  type: 'language',
}).of(lang);
