import React, { Component } from 'react';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import Locations from '../../data/Locations';
import languages from '../../locales';
import Container from '../Container';
import ContentBox from '../ContentBox';

import './index.module.scss';

class Layout extends Component {
  render() {
    const location = this.props.match;

    const unlocalisedPath = location.url.substr(location.params.locale.length + 1);

    return (
      <div>
        <FormattedMessage id="site.name">
        {siteName => (
          <FormattedMessage id="site.description">
            {siteDescription => (
              <Helmet>
                <meta charSet="utf-8" />
                <link rel="shortcut icon" href={Locations.favicon} />
                <meta property="og:title" content={siteName} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:description" content={siteDescription} />
                <meta name="description" content={siteDescription} />
                <link rel="manifest" href={`/${this.props.intl.locale}.manifest.json`} />
                {
                  languages
                    .filter(language => language.translations)
                    .map(language => <link key={language.code} rel="alternate" href={`${Locations.domain}/${language.code}${unlocalisedPath}`} hreflang={language.code} />)
                }
              </Helmet>
            )}
          </FormattedMessage>
        )}
        </FormattedMessage>
        <NavigationBar unlocalisedPath={unlocalisedPath} />
          <noscript>
            <Container>
              <ContentBox>
                <FormattedMessage id="errors.website.noscript" />
              </ContentBox>
            </Container>
          </noscript>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default injectIntl(Layout);
