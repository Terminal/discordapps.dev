import { REQUEST_CATEGORIES, RECIEVE_CATEGORIES } from '../actions/categories';

function categories(state = {
  fetching: false,
  fetched: false,
  data: []
}, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        fetching: true
      });
    case RECIEVE_CATEGORIES:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        data: action.data.slice()
      });
    default:
      return state;
  }
}

export default categories;
