import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import Locations from '../../data/Locations';
import languages from '../../locales';
import Footer from './Footer';
import containers from './containers.module.scss';
import './index.module.scss';
import NavbarLinks from './NavbarLinks';
import NavigationBar from './NavigationBar';

class Layout extends Component {
  render() {
    const location = this.props.match;

    const unlocalisedPath = location.url.substr(location.params.locale.length + 1);

    return (
      <div className={containers.app}>
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
        <div className={containers.navback} />
        <NavigationBar unlocalisedPath={unlocalisedPath} />
        <NavbarLinks unlocalisedPath={this.props.unlocalisedPath} />
        <div className={containers.content}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default injectIntl(Layout);
