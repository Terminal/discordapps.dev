import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';

import './../ModestaCSS/css/modesta.min.css';
import './../ModestaCSS/css/twemoji.min.css';
import '../components/index.scss';

import enData from 'react-intl/locale-data/en';
import frData from 'react-intl/locale-data/fr';
import deData from 'react-intl/locale-data/de';

import locales from '../locales';

const messages = {};
Object.keys(locales).map((key) => messages[key] = locales[key].data);

addLocaleData([...enData, ...frData, ...deData]);

class GlobalLayout extends React.Component {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let locale = 'en';

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (typeof localStorage !== 'undefined' && localStorage.getItem('locale')) {
      locale = localStorage.getItem('locale');
    } else if (ctx && ctx.req) {
      locale = ctx.req.locale;
    } else if (typeof window !== 'undefined' && window.__NEXT_DATA__.props) {
      locale = window.__NEXT_DATA__.props.locale;
    }

    return { pageProps, locale }
  }
  render() {
    const { Component, pageProps, locale } = this.props
    return (
      <IntlProvider locale={locale} messages={messages[this.props.locale]}>
        <Component {...pageProps} />
      </IntlProvider>
    );
  }
}

GlobalLayout.propTypes = {
  children: PropTypes.any,
  locale: PropTypes.string
};

export default GlobalLayout;
