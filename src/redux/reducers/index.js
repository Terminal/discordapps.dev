import { combineReducers } from 'redux';
import auth from './auth';
import categories from './categories';
import bot from './bot';

export default combineReducers({
  auth,
  categories,
  bot
});
