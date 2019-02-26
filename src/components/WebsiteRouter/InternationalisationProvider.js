import flat from 'flat';
import React, { Component } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import languages from '../../locales';
import { setLocaleHandler } from '../../redux/actions/locale';

const messages = languages
  .filter(language => language.translations)
  .reduce((prev, curr) => {
    addLocaleData(curr.reactIntl);
    prev[curr.code] = flat(curr.translations);
    return prev;
  }, {})

class InternationalisationProvider extends Component {
  render() {
    const { dispatch, match } = this.props;
    dispatch(setLocaleHandler(match.params.locale));
    return (
      <IntlProvider
        locale={match.params.locale}
        messages={messages[match.params.locale]}
        defaultLocale="en-GB">
        {this.props.children}
      </IntlProvider>
    )
  }
}

export default connect()(InternationalisationProvider);

