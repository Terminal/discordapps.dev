import React, { Component } from 'react';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';

class Layout extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Helmet>
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
