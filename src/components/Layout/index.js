import React, { Component } from 'react';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import WereNotReadyToGoLiveBox from '../WereNotReadyToGoLiveBox';
import Container from '../Container';

class Layout extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
        <Container>
          <WereNotReadyToGoLiveBox />
        </Container>
        <Footer />
      </div>
    )
  }
}

export default Layout;
