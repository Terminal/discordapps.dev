import Locations from "../../data/Locations";

export const REQUEST_BOT = 'REQUEST_BOT';
export const RECIEVE_BOT = 'RECIEVE_BOT';
export const RESET_BOT = 'RESET_BOT';

function requestBot(id) {
  return {
    type: REQUEST_BOT,
    id
  };
}

function resetBot() {
  return {
    type: RESET_BOT
  };
}


function recieveBot(json, status, id) {
  return {
    type: RECIEVE_BOT,
    data: json.data,
    status,
    id
  };
}

function fetchBot(id) {
  return (dispatch) => {
    dispatch(requestBot(id));
    return fetch(`${Locations.server}/reactjs/v1/bots/id/${id}`, {
      credentials: 'include'
    })
      .then(res => {
        return res.json()
          .then((json) => {
            return dispatch(recieveBot(json, res.status, id))
          })
      })
  };
}

function shouldFetchBot(state, id) {
  // If the data has already been fetched, do not fetch it
  if (state.bot.data && state.bot.data.id === id && state.bot.id === id) return false;
  return true;
}

export function fetchABot({match}) {
  return (dispatch, getState) => {
    if (shouldFetchBot(getState(), match.params.id)) {
      return dispatch(fetchBot(match.params.id))
    }
  };
}

export function resetTheBot() {
  return (dispatch) => {
    dispatch(resetBot());
  }
}
