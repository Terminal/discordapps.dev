import enLocale from './locales/en-GB.json';
import daLocale from './locales/da.json';
import deLocale from './locales/de.json';
import frLocale from './locales/fr.json';
import plLocale from './locales/pl.json';
import zhCnLocale from './locales/zh-cn.json';

import enData from 'react-intl/locale-data/en';
import daData from 'react-intl/locale-data/da';
import deData from 'react-intl/locale-data/de';
import frData from 'react-intl/locale-data/fr';
import plData from 'react-intl/locale-data/pl';
import zhData from 'react-intl/locale-data/zh';

export default {
  ar: {
    flag: '',
    top: false,
    priority: 22
  },
  da: {
    flag: 'twa-flag-dk',
    top: false,
    priority: 21,
    translations: daLocale
  },
  de: {
    flag: 'twa-de',
    top: false,
    priority: 3,
    translations: deLocale
  },
  el: {
    flag: '',
    top: false,
    priority: 20
  },
  'en-GB': {
    flag: 'twa-gb',
    top: true,
    priority: 1,
    translations: enLocale
  },
  es: {
    flag: '',
    top: false,
    priority: 4
  },
  et: {
    flag: '',
    top: false,
    priority: 19
  },
  fi: {
    flag: '',
    top: false,
    priority: 18
  },
  fj: {
    flag: '',
    top: false,
    priority: 17
  },
  fr: {
    flag: 'twa-fr',
    top: false,
    priority: 2,
    translations: frLocale
  },
  gd: {
    flag: '',
    top: false,
    priority: 16
  },
  he: {
    flag: '',
    top: false,
    priority: 26
  },
  hi: {
    flag: '',
    top: false,
    priority: 15
  },
  it: {
    flag: '',
    top: false,
    priority: 5
  },
  ja: {
    flag: '',
    top: false,
    priority: 14
  },
  ko: {
    flag: '',
    top: false,
    priority: 13
  },
  la: {
    flag: '',
    top: false,
    priority: 12
  },
  nl: {
    flag: '',
    top: false,
    priority: 11
  },
  no: {
    flag: 'twa-flag-no',
    top: false,
    priority: 10
  },
  pl: {
    flag: 'twa-flag-pl',
    top: false,
    priority: 27,
    translations: plLocale
  },
  pt: {
    flag: 'twa-flag-pt',
    top: false,
    priority: 23
  },
  ru: {
    flag: 'twa-ru',
    top: false,
    priority: 6
  },
  sv: {
    flag: 'twa-flag-sv',
    top: false,
    priority: 7
  },
  tr: {
    flag: 'twa-flag-tr',
    top: false,
    priority: 24
  },
  vi: {
    flag: 'twa-flag-vi',
    top: false,
    priority: 25
  },
  'zh-cn': {
    flag: 'twa-cn',
    top: false,
    priority: 9,
    translations: zhCnLocale
  },
  'zh-tw': {
    flag: 'twa-flag-tw',
    top: false,
    priority: 8
  }
}
