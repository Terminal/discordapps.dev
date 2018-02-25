import React from 'react';
import { Route } from 'react-router-dom';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js';

import Home from './Home.jsx';
import Header from './../components/header/Header.jsx';

export default () => (
  <div className="app">
    <Header />
    <Route exact path="/" component={Home} />
  </div>
);
