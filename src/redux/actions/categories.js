import Configuration from "../../data/Configuration";

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES';

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  };
}

function receiveCategories(json) {
  return {
    type: RECIEVE_CATEGORIES,
    data: json.data
  };
}

function fetchCategories() {
  return (dispatch) => {
    dispatch(requestCategories());
    return fetch(`${Configuration.server}/reactjs/v1/categories`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(json => dispatch(receiveCategories(json)));
  };
}

function shouldFetchCategories(state) {
  if (state.categories.fetching) return false;
  if (state.categories.fetched) return false;
  return true;
}

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCategories(getState())) {
      return dispatch(fetchCategories());
    }
  };
}
