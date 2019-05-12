import { combineReducers } from 'redux';
import auth from './auth';
import bot from './bot';
import doc from './doc';
import toasts from './toasts';

export default combineReducers({
  auth,
  bot,
  doc,
  toasts
});
