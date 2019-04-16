import { REQUEST_DOC, RECIEVE_DOC, RESET_DOC } from "../actions/doc";

function doc(state = {
  fetching: false,
  fetched: false,
  data: null,
  status: null,
  id: null
}, action) {
  switch (action.type) {
    case REQUEST_DOC:
      return Object.assign({}, state, {
        fetching: true,
        fetched: false,
        data: null,
        page: action.page
      });
    case RECIEVE_DOC:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        data: Object.keys(action.data).length === 0 ? null : action.data,
        status: action.status
      });
    default:
      return state;
  }
}

export default doc;
