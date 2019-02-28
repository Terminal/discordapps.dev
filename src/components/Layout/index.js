import React, { Component } from 'react';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';

class Layout extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Layout;
