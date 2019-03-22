import { combineReducers } from 'redux';
import auth from './auth';
import options from './options';
import categories from './categories';
import bot from './bot';

export default combineReducers({
  auth,
  options,
  categories,
  bot
});
