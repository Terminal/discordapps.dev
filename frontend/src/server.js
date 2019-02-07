import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import configureStore from './redux/configureStore';
import LocaleRoutes from './components/LocaleRoutes';

module.exports = function render(initialState, url) {
  // Configure the store with the initial state provided
  const store = configureStore(initialState);

  const context = {};

  // render the App store static markup ins content variable
  const content = renderToString(
    <Provider store={store} >
      <StaticRouter location={url} context={context}>
        <LocaleRoutes />
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  // Get a copy of store data to create the same store on client side
  const preloadedState = store.getState();

  return { content, preloadedState, context, helmet };
};
