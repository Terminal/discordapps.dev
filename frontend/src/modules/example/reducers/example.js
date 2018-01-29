import { combineReducers } from 'redux';

import { EXAMPLE_FETCH_SUCCEED, EXAMPLE_FETCH_REQUESTED, EXAMPLE_FETCH_FAILED } from '../actions/example';

function resultReducer(state = [], action) {
    switch (action.type) {
        case EXAMPLE_FETCH_SUCCEED: return action.results;
        default: return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case EXAMPLE_FETCH_REQUESTED: return null;
        case EXAMPLE_FETCH_FAILED: return action.error;
        default: return state;
    }
}

function loadingReducer(state = false, action) {
    switch (action.type) {
        case EXAMPLE_FETCH_REQUESTED: return true;
        case EXAMPLE_FETCH_SUCCEED: return false;
        case EXAMPLE_FETCH_FAILED: return false;
        default: return state;
    }
}

export default combineReducers({
    results: resultReducer,
    error: errorReducer,
    loading: loadingReducer,
})

