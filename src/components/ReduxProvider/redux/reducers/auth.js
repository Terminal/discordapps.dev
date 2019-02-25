import { REQUEST_AUTH, RECEIVE_AUTH } from '../actions/auth';

function auth(state = {
  fetching: false,
  data: null
}, action) {
  switch (action.type) {
    case REQUEST_AUTH:
      return Object.assign({}, state, {
        isFetchingAuth: true
      });
    case RECEIVE_AUTH:
      return Object.assign({}, state, {
        isFetchingAuth: false,
        auth: action.auth
      });
    default:
      return state;
  }
}

export default auth;
