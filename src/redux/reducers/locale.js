import { SET_LOCALE } from '../actions/locale';

function locale(state = 'en-GB', action) {
  switch (action.type) {
    case SET_LOCALE:
      return action.locale
    default:
      return state;
  }
}

export default locale;
