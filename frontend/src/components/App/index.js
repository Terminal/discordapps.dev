import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import flat from 'flat';
import Helmet from 'react-helmet';

import enData from 'react-intl/locale-data/en';
import frData from 'react-intl/locale-data/fr';
import deData from 'react-intl/locale-data/de';
import daData from 'react-intl/locale-data/da';
import zhData from 'react-intl/locale-data/zh';

import enLocale from '../../../../locales/en-GB.json';
import frLocale from '../../../../locales/fr.json';
import deLocale from '../../../../locales/de.json';
import daLocale from '../../../../locales/da.json';
import zhCnLocale from '../../../../locales/zh-cn.json';

import './ModestaCSS/scss/modesta.scss';
import './ModestaCSS/scss/twemoji.scss';
import './index.scss';
import Navbar from '../Navbar';
import Routes from '../Routes';
import Footer from '../Footer';

addLocaleData([...enData, ...frData, ...deData, ...daData, ...zhData]);

const messages = {
  en: flat(enLocale),
  fr: flat(frLocale),
  de: flat(deLocale),
  da: flat(daLocale),
  'zh-cn': flat(zhCnLocale)
};

class App extends Component {
  render() {
    const locale = this.props.locale || this.props.match.params.lang;

    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div>
          <Helmet>
            <link href="/bundle.css" rel="stylesheet"></link>
          </Helmet>
          <Navbar />
          <Routes />
          <Footer />
        </div>
      </IntlProvider>
    );
  }
}

export default App;
