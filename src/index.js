import '@babel/polyfill';
import 'react-app-polyfill/ie11';

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import ReduxProvider from './components/ReduxProvider';

import * as serviceWorker from './serviceWorker';

const element = document.getElementById('app')

const app = (
  <ReduxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
)

ReactDOM.render(app, element)

// Enable Hot Module Reloading
if (module.hot) {
  module.hot.accept();
}

serviceWorker.register();
