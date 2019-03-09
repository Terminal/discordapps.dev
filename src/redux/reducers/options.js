import { SET_LOCALE } from '../actions/options';

function options(state = {
  locale: 'en-GB'
}, action) {
  switch (action.type) {
    case SET_LOCALE:
      return Object.assign({}, state, {
        locale: action.locale
      })
    default:
      return state;
  }
}

export default options;
