import React, { Component } from 'react';
import ReduxProvider from './components/ReduxProvider';
import InternationalisationProvider from './components/InternationalisationProvider';
import WebsiteRouter from './components/WebsiteRouter';

class App extends Component {
  render() {
    return (
      <ReduxProvider>
        <InternationalisationProvider>
          <WebsiteRouter />
        </InternationalisationProvider>
      </ReduxProvider>
    );
  }
}

export default App;
