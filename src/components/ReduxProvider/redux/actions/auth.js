export const REQUEST_AUTH = 'REQUEST_AUTH';
export const RECEIVE_AUTH = 'RECEIVE_AUTH';

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

function fetchAuth() {
  return (dispatch) => {
    dispatch(requestAuth());
    return fetch('/auth/info')
      .then(res => res.json())
      .then(json => dispatch(receiveAuth(json)));
  };
}

function shouldFetchAuth(state) {
  if (state.isFetchingAuth) {
    return false;
  }
  return true;
}

export function fetchAuthIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAuth(getState())) {
      return dispatch(fetchAuth());
    }
  };
}
