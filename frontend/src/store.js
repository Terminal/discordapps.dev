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

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

// Load React-Intl
import enLocale from 'react-intl/locale-data/en';
import deLocale from 'react-intl/locale-data/de';
import { addLocaleData } from 'react-intl';

import rootSaga from './sagas';
import reducer from './reducer';

addLocaleData(enLocale);
addLocaleData(deLocale);

// Set up the redux store, including the react router middleware
export const history = createHistory();
const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const composer = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
const store = createStore(
  reducer,
  {},
  composer(applyMiddleware(routingMiddleware, sagaMiddleware)),
);

// Start running the main saga
sagaMiddleware.run(rootSaga);

export default store;
