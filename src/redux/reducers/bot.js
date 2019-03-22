import { REQUEST_BOT, RECIEVE_BOT, RESET_BOT } from "../actions/bot";

function bot(state = {
  fetching: false,
  fetched: false,
  data: null,
  status: null
}, action) {
  switch (action.type) {
    case REQUEST_BOT:
      return Object.assign({}, state, {
        fetching: true,
        fetched: false,
        data: null
      });
    case RESET_BOT:
      return Object.assign({}, state, {
        fetching: false,
        fetched: false,
        data: null,
        status: null
      });
    case RECIEVE_BOT:
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

export default bot;
