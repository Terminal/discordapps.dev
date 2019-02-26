import React, { Component } from 'react';
import ReduxProvider from './components/ReduxProvider';
import WebsiteRouter from './components/WebsiteRouter';

class App extends Component {
  render() {
    return (
      <ReduxProvider>
        <WebsiteRouter />
      </ReduxProvider>
    );
  }
}

export default App;
