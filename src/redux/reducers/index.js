import { combineReducers } from 'redux';
import auth from './auth';
import locale from './locale';
import categories from './categories';

export default combineReducers({
  auth,
  locale,
  categories
});
