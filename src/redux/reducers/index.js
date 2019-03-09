import { combineReducers } from 'redux';
import auth from './auth';
import options from './options';
import categories from './categories';

export default combineReducers({
  auth,
  options,
  categories
});
