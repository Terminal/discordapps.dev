/**
    ls.terminal.ink Discord Bot List Server
    Copyright (C) 2018 Moustacheminer Server Services
    Copyright (C) 2018 Terminal.ink

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from 'react';
import { Route } from 'react-router-dom';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js';

import Home from './Home.jsx';
import Header from './../components/header/Header.jsx';
import EditPage from './EditPage.jsx';
import DocsPage from './DocsPage.jsx';

export default () => (
  <div className="app">
    <Header />
    <Route exact path="/" component={Home} />
    <Route exact path="/docs" component={DocsPage} />
    <Route exact path="/edit/:id" component={EditPage} />
  </div>
);
