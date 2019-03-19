import daData from 'react-intl/locale-data/da';
import deData from 'react-intl/locale-data/de';
import enData from 'react-intl/locale-data/en';
import frData from 'react-intl/locale-data/fr';
import plData from 'react-intl/locale-data/pl';
import zhData from 'react-intl/locale-data/zh';
import daLocale from './da.json';
import deLocale from './de.json';
import enLocale from './en-GB.json';
import enUSLocale from './en-US.json';
import frLocale from './fr.json';
import plLocale from './pl.json';
import zhCnLocale from './zh-cn.json';

const languages = [
  {
    code: 'ar',
    flag: '',
    top: false,
    priority: 22,
    botPageLanguage: true,
  },
  {
    code: 'da',
    flag: 'twa-flag-dk',
    top: false,
    priority: 21,
    translations: daLocale,
    reactIntl: daData,
    botPageLanguage: true,
  },
  {
    code: 'de',
    flag: 'twa-de',
    top: false,
    priority: 3,
    translations: deLocale,
    reactIntl: deData,
    botPageLanguage: true,
  },
  {
    code: 'el',
    flag: '',
    top: false,
    priority: 20,
    botPageLanguage: true,
  },
  {
    code: 'en-GB',
    flag: 'twa-gb',
    top: true,
    priority: 1,
    translations: enLocale,
    reactIntl: enData,
    botPageLanguage: true,
  },
  {
    code: 'en-US',
    flag: 'twa-us',
    master: 'en-GB',
    top: true,
    priority: 1.1,
    translations: enUSLocale,
    reactIntl: enData,
    botPageLanguage: false,
  },
  {
    code: 'es',
    flag: '',
    top: false,
    priority: 4,
    botPageLanguage: true,
  },
  {
    code: 'et',
    flag: '',
    top: false,
    priority: 19,
    botPageLanguage: true,
  },
  {
    code: 'fi',
    flag: '',
    top: false,
    priority: 18,
    botPageLanguage: true,
  },
  {
    code: 'fj',
    flag: '',
    top: false,
    priority: 17,
    botPageLanguage: true,
  },
  {
    code: 'fr',
    flag: 'twa-fr',
    top: false,
    priority: 2,
    translations: frLocale,
    reactIntl: frData,
    botPageLanguage: true,
  },
  {
    code: 'gd',
    flag: '',
    top: false,
    priority: 16,
    botPageLanguage: true,
  },
  {
    code: 'he',
    flag: '',
    top: false,
    priority: 26,
    botPageLanguage: true,
  },
  {
    code: 'hi',
    flag: '',
    top: false,
    priority: 15,
    botPageLanguage: true,
  },
  {
    code: 'it',
    flag: '',
    top: false,
    priority: 5,
    botPageLanguage: true,
  },
  {
    code: 'ja',
    flag: '',
    top: false,
    priority: 14,
    botPageLanguage: true,
  },
  {
    code: 'ko',
    flag: '',
    top: false,
    priority: 13,
    botPageLanguage: true,
  },
  {
    code: 'la',
    flag: '',
    top: false,
    priority: 12,
    botPageLanguage: true,
  },
  {
    code: 'nl',
    flag: '',
    top: false,
    priority: 11,
    botPageLanguage: true,
  },
  {
    code: 'no',
    flag: 'twa-flag-no',
    top: false,
    priority: 10,
    botPageLanguage: true,
  },
  {
    code: 'pl',
    flag: 'twa-flag-pl',
    top: false,
    priority: 27,
    translations: plLocale,
    reactIntl: plData,
    botPageLanguage: true,
  },
  {
    code: 'pt',
    flag: 'twa-flag-pt',
    top: false,
    priority: 23,
    botPageLanguage: true,
  },
  {
    code: 'ru',
    flag: 'twa-ru',
    top: false,
    priority: 6,
    botPageLanguage: true,
  },
  {
    code: 'sv',
    flag: 'twa-flag-sv',
    top: false,
    priority: 7,
    botPageLanguage: true,
  },
  {
    code: 'tr',
    flag: 'twa-flag-tr',
    top: false,
    priority: 24,
    botPageLanguage: true,
  },
  {
    code: 'vi',
    flag: 'twa-flag-vi',
    top: false,
    priority: 25,
    botPageLanguage: true,
  },
  {
    code: 'zh-cn',
    flag: 'twa-cn',
    top: false,
    priority: 9,
    translations: zhCnLocale,
    reactIntl: zhData,
    botPageLanguage: true,
  },
  {
    code: 'zh-tw',
    flag: 'twa-flag-tw',
    top: false,
    priority: 8,
    botPageLanguage: true,
  }
];

const Localise = (contents, locale) => {
  let localisedContents = contents.find(content => content.locale === locale);
  if (localisedContents) {
    return localisedContents
  }
  const availableLanguages = languages.sort((a, b) => {
    if (a.priority < b.priority) {
      return -1;
    } else if (a.priority > b.priority) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < availableLanguages.length; i += 1) {
    localisedContents = contents.find(content => content.locale === availableLanguages[i].code);
    if (localisedContents) {
      return localisedContents
    }
  }

  throw new Error('Cannot find any languages for this bot!');
};

// Get the language that the bots can be in
const getMasterLanguage = (locale) => {
  const language = languages.find(language => language.code === locale);
  if (language && language.master) return language.master;
  return null;
}

export default languages;
export {
  Localise,
  getMasterLanguage
};
