import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

let composeEnhancers = compose;

// If within a web browser...
if (typeof window !== 'undefined') {

  // If the Development tools is installed, hook into that
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();
  }
}

export default function configureStore() {
  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );
}
