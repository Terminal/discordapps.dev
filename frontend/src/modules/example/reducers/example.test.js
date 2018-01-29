import reducer from './example';

import { EXAMPLE_FETCH_SUCCEED, EXAMPLE_FETCH_REQUESTED, EXAMPLE_FETCH_FAILED } from '../actions/example';

const state = {
    results: [],
    loading: false,
    error: null
};

const fetchAction = { type: EXAMPLE_FETCH_REQUESTED };
const succeedAction = { type: EXAMPLE_FETCH_SUCCEED };
const failAction = { type: EXAMPLE_FETCH_FAILED };

describe('when calling the example reducer', () => {
    test('it should return the correct initial state', () => {
        expect(reducer(undefined, {})).toEqual(state);
    });

    test('it should update the loading indicator', () => {
       expect(reducer(state, fetchAction).loading).toEqual(true);
       expect(reducer(state, succeedAction).loading).toEqual(false);
       expect(reducer(state, failAction).loading).toEqual(false);
    });

    test('it should update the error message', () => {
        expect(reducer(state, fetchAction).error).toEqual(null);
        expect(reducer(state, failAction).error).toEqual(failAction.error);
    })
})