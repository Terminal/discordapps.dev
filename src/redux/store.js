import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const stuffToCompose = [
  applyMiddleware(thunk)
];

if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  stuffToCompose.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default function configureStore() {
  return createStore(
    reducer,
    compose(...stuffToCompose)
  );
}
