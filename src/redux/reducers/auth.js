import { REQUEST_AUTH, RECEIVE_AUTH } from '../actions/auth';

function auth(state = {
  fetching: false,
  fetched: false,
  data: null
}, action) {
  switch (action.type) {
    case REQUEST_AUTH:
      return Object.assign({}, state, {
        fetching: true
      });
    case RECEIVE_AUTH:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        data: action.auth
      });
    default:
      return state;
  }
}

export default auth;
