import { combineReducers } from 'redux';
import auth from './auth';
import categories from './categories';
import bot from './bot';
import doc from './doc';

export default combineReducers({
  auth,
  categories,
  bot,
  doc
});
