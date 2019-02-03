import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './redux/configureStore';
import LocaleRoutes from './components/LocaleRoutes';

// Create a fresh store
const store = configureStore();


render(
  <Provider store={store} >
    <BrowserRouter>
      <LocaleRoutes />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app')
);
