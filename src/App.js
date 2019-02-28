import React, { Component } from 'react';
import ReduxProvider from './components/ReduxProvider';
import WebsiteRouter from './components/WebsiteRouter';
import { Helmet } from 'react-helmet';

class App extends Component {
  render() {
    return (
      <ReduxProvider>
        <Helmet>
          <meta charSet="utf-8" />
        </Helmet>
        <WebsiteRouter />
      </ReduxProvider>
    );
  }
}

export default App;
