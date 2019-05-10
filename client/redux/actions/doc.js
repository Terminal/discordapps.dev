import Locations from "../../data/Locations";

export const REQUEST_DOC = 'REQUEST_DOC';
export const RECIEVE_DOC = 'RECIEVE_DOC';

function requestDoc(page) {
  return {
    type: REQUEST_DOC,
    page
  };
}


function recieveDoc(text, status, page) {
  return {
    type: RECIEVE_DOC,
    data: text,
    status,
    page
  };
}

function fetchDoc(page) {
  return (dispatch) => {
    dispatch(requestDoc(page));
    return fetch(`${Locations.docsServer}/posts${page}/index.mdx`)
      .then(res => {
        if (res.status !== 200) return dispatch(recieveDoc({}, res.status, page))
        return res.text()
          .then((text) => {
            return dispatch(recieveDoc(text, res.status, page))
          })
      })
  };
}

function shouldFetchDoc(state, page) {
  // If the data has already been fetched, do not fetch it
  if (state.doc.page === page) return false;
  return true;
}

export function fetchADoc({url}) {
  return (dispatch, getState) => {
    if (shouldFetchDoc(getState(), url)) {
      return dispatch(fetchDoc(url))
    }
  };
}

