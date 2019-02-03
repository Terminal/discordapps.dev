import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import flat from 'flat';

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

import { fetchAppsIfNeeded } from '../../redux/actions';
import './index.scss';
import Navbar from '../Navbar';
import Routes from '../Routes';

addLocaleData([...enData, ...frData, ...deData, ...daData, ...zhData]);

const messages = {
  'en-GB': flat(enLocale),
  fr: flat(frLocale),
  de: flat(deLocale),
  da: flat(daLocale),
  'zh-cn': flat(zhCnLocale)
};

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAppsIfNeeded());
  }

  render() {
    // const { isFetching, apps } = this.props;
    // const totalapps = apps.length;

    return (
      <IntlProvider locale={this.props.locale || this.props.match.params.lang} messages={messages[this.props.locale || this.props.match.params.lang]}>
        <div>
          <Navbar />
          <noscript>
            <p>JavaScript is required to view this page</p>
          </noscript>
          <Routes />
          {/* {isFetching && apps.length === 0 && <h2>Loading...</h2>}
          {!isFetching && apps.length === 0 && <h2>Empty.</h2>}
          {JSON.stringify(apps)}
          <p>You&apos;re a gay</p> */}
        </div>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state) => {
  const { isFetching, apps } = state;

  return {
    isFetching,
    apps
  };
};

export default connect(mapStateToProps)(App);
