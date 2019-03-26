import '@babel/polyfill';
import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';

import ReduxProvider from './components/ReduxProvider';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render((
  <ReduxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
