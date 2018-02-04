import React from 'react';
import { Route } from 'react-router-dom';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap.native/dist/bootstrap-native-v4.min';

import Home from './Home.jsx';
import DocsPage from './DocsPage.jsx';
import Header from './../components/header/Header.jsx';

export default () => (
  <div className="app">
    <Header />
    <h1>ls.terminal.ink</h1>
    <Route exact path="/" component={Home} />
    <Route exact path="/docs" component={DocsPage} />
  </div>
);
