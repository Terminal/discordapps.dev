import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import store, { history } from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import LocaleWrapper from './LocaleWrapper.js';
import Application from './pages/Application';

function render() {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<LocaleWrapper>
					<ConnectedRouter history={history}>
						<Application />
					</ConnectedRouter>
				</LocaleWrapper>
			</Provider>
		</AppContainer>,
		document.getElementById('app')
	);
}

render();
if (module.hot) {
	module.hot.accept('./pages/Application.js', render);
}