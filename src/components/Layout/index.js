import React, { Component } from 'react';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

class Layout extends Component {
  render() {
    return (
      <div>
        <FormattedMessage id="site.name">
        {siteName => (
          <FormattedMessage id="site.description">
            {siteDescription => (
              <Helmet>
                <meta charSet="utf-8" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta property="og:title" content={siteName} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:description" content={siteDescription} />
                <meta name="description" content={siteDescription} />
              </Helmet>
            )}
          </FormattedMessage>
        )}
        </FormattedMessage>
        <NavigationBar />
        {this.props.children}
        {/* <Container>
          <WereNotReadyToGoLiveBox />
        </Container> */}
        <Footer />
      </div>
    )
  }
}

export default Layout;
