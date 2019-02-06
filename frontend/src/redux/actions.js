
export const REQUEST_APPS = 'REQUEST_APPS';
export const RECEIVE_APPS = 'RECEIVE_APPS';
export const REQUEST_AUTH = 'REQUEST_AUTH';
export const RECEIVE_AUTH = 'RECEIVE_AUTH';

function requestApps() {
  return {
    type: REQUEST_APPS
  };
}

function receiveApps(json) {
  return {
    type: RECEIVE_APPS,
    apps: json
  };
}

function requestAuth() {
  return {
    type: REQUEST_AUTH
  };
}

function receiveAuth(json) {
  return {
    type: RECEIVE_AUTH,
    auth: json
  };
}

function fetchApps() {
  return (dispatch) => {
    dispatch(requestApps());
    return fetch('https://ls.terminal.ink/api/v2/bots')
      .then(res => res.json())
      .then(json => dispatch(receiveApps(json.data)));
  };
}

function fetchAuth() {
  return (dispatch) => {
    dispatch(requestAuth());
    return fetch('/auth/info')
      .then(res => res.json())
      .then(json => dispatch(receiveAuth(json)));
  };
}

function shouldFetchApps(state) {
  const apps = state.apps;
  if (apps.length === 0) {
    return true;
  } else if (state.isFetchingApps) {
    return false;
  }
}

function shouldFetchAuth(state) {
  if (state.isFetchingAuth) {
    return false;
  }
  return true;
}

export function fetchAppsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchApps(getState())) {
      return dispatch(fetchApps());
    }
  };
}

export function fetchAuthIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAuth(getState())) {
      return dispatch(fetchAuth());
    }
  };
}
