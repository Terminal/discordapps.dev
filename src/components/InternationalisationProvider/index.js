import flat from 'flat';
import React, { Component } from 'react';
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import languages from '../../locales';
import { Helmet } from 'react-helmet';

const messages = languages
  .filter(language => language.translations)
  .reduce((prev, curr) => {
    addLocaleData(curr.reactIntl);
    prev[curr.code] = flat(curr.translations);
    return prev;
  }, {})

class InternationalisationProvider extends Component {
  render() {
    const { match, location } = this.props;

    if (!messages[match.params.locale]) return (
      <Redirect to={`/en-GB${location.pathname}`} />
    )

    return (
      <IntlProvider
        locale={match.params.locale}
        messages={Object.assign({}, messages['en-GB'], messages[match.params.locale])}
        defaultLocale="en-GB">
        <div>
          <FormattedMessage id="site.name">
            {(title) => (
              <Helmet
                titleTemplate={`%s - ${title}`}
                defaultTitle={title}
                >
                <html lang={match.params.locale} />
              </Helmet>
            )}
          </FormattedMessage>
          {this.props.children}
        </div>
      </IntlProvider>
    )
  }
}


export default InternationalisationProvider;
