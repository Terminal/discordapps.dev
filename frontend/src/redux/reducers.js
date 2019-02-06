import { REQUEST_APPS, RECEIVE_APPS, REQUEST_AUTH, RECEIVE_AUTH } from './actions';

function apps(state = {
  isFetchingApps: false,
  isFetchingAuth: false,
  apps: [],
  auth: null
}, action) {
  switch (action.type) {
    case REQUEST_APPS:
      return Object.assign({}, state, {
        isFetchingApps: true
      });
    case RECEIVE_APPS:
      return Object.assign({}, state, {
        isFetchingApps: false,
        apps: action.apps
      });
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

export default apps;
