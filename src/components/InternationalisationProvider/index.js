import flat from 'flat';
import React, { Component } from 'react';
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import languages from '../../locales';
import { setLocaleHandler } from '../../redux/actions/options';
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
    const { dispatch, match, location, options } = this.props;

    if (!messages[match.params.locale]) return (
      <Redirect to={`/en-GB${location.pathname}`} />
    )

    if (options.locale !== match.params.locale) {
      dispatch(setLocaleHandler(match.params.locale));
    }

    return (
      <IntlProvider
        locale={match.params.locale}
        messages={Object.assign({}, messages['en-GB'], messages[match.params.locale])}
        defaultLocale="en-GB">
        <>
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
        </>
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state) => {
  const { options } = state;
  return { options };
}

export default connect(mapStateToProps)(InternationalisationProvider);
