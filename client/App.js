import React, { Component } from 'react';
import Routes from './components/Routes';
import Toasts from './components/Toasts';

class App extends Component {
  render() {
    return (
      <>
        <Toasts />
        <Routes />
      </>
    );
  }
}

export default App;
