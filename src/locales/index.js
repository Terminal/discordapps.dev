import daData from 'react-intl/locale-data/da';
import deData from 'react-intl/locale-data/de';
import enData from 'react-intl/locale-data/en';
import frData from 'react-intl/locale-data/fr';
import plData from 'react-intl/locale-data/pl';
import zhData from 'react-intl/locale-data/zh';
import daLocale from './da.json';
import deLocale from './de.json';
import enLocale from './en-GB.json';
import frLocale from './fr.json';
import plLocale from './pl.json';
import zhCnLocale from './zh-cn.json';

export default [
  {
    code: 'ar',
    flag: '',
    top: false,
    priority: 22
  },
  {
    code: 'da',
    flag: 'twa-flag-dk',
    top: false,
    priority: 21,
    translations: daLocale,
    reactIntl: daData
  },
  {
    code: 'de',
    flag: 'twa-de',
    top: false,
    priority: 3,
    translations: deLocale,
    reactIntl: deData
  },
  {
    code: 'el',
    flag: '',
    top: false,
    priority: 20
  },
  {
    code: 'en-GB',
    flag: 'twa-gb',
    top: true,
    priority: 1,
    translations: enLocale,
    reactIntl: enData
  },
  {
    code: 'es',
    flag: '',
    top: false,
    priority: 4
  },
  {
    code: 'et',
    flag: '',
    top: false,
    priority: 19
  },
  {
    code: 'fi',
    flag: '',
    top: false,
    priority: 18
  },
  {
    code: 'fj',
    flag: '',
    top: false,
    priority: 17
  },
  {
    code: 'fr',
    flag: 'twa-fr',
    top: false,
    priority: 2,
    translations: frLocale,
    reactIntl: frData
  },
  {
    code: 'gd',
    flag: '',
    top: false,
    priority: 16
  },
  {
    code: 'he',
    flag: '',
    top: false,
    priority: 26
  },
  {
    code: 'hi',
    flag: '',
    top: false,
    priority: 15
  },
  {
    code: 'it',
    flag: '',
    top: false,
    priority: 5
  },
  {
    code: 'ja',
    flag: '',
    top: false,
    priority: 14
  },
  {
    code: 'ko',
    flag: '',
    top: false,
    priority: 13
  },
  {
    code: 'la',
    flag: '',
    top: false,
    priority: 12
  },
  {
    code: 'nl',
    flag: '',
    top: false,
    priority: 11
  },
  {
    code: 'no',
    flag: 'twa-flag-no',
    top: false,
    priority: 10
  },
  {
    code: 'pl',
    flag: 'twa-flag-pl',
    top: false,
    priority: 27,
    translations: plLocale,
    reactIntl: plData
  },
  {
    code: 'pt',
    flag: 'twa-flag-pt',
    top: false,
    priority: 23
  },
  {
    code: 'ru',
    flag: 'twa-ru',
    top: false,
    priority: 6
  },
  {
    code: 'sv',
    flag: 'twa-flag-sv',
    top: false,
    priority: 7
  },
  {
    code: 'tr',
    flag: 'twa-flag-tr',
    top: false,
    priority: 24
  },
  {
    code: 'vi',
    flag: 'twa-flag-vi',
    top: false,
    priority: 25
  },
  {
    code: 'zh-cn',
    flag: 'twa-cn',
    top: false,
    priority: 9,
    translations: zhCnLocale,
    reactIntl: zhData
  },
  {
    code: 'zh-tw',
    flag: 'twa-flag-tw',
    top: false,
    priority: 8
  }
]
