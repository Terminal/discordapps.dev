import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas.js';
import reducer from './reducer.js';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

// Load React-Intl
import enLocale from 'react-intl/locale-data/en';
import deLocale from 'react-intl/locale-data/de';
import { addLocaleData } from 'react-intl';
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
	composer(applyMiddleware(routingMiddleware, sagaMiddleware))
);

// Start running the main saga
sagaMiddleware.run(rootSaga);

export default store;
