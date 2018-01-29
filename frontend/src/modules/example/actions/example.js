export const EXAMPLE_FETCH_SUCCEED = 'example/FETCH_SUCCEED';
export const EXAMPLE_FETCH_REQUESTED = 'example/FETCH_REQUEST';
export const EXAMPLE_FETCH_FAILED = 'example/FETCH_FAIL';

export const fetchAction = () => ({ type: EXAMPLE_FETCH_REQUESTED });
export const fetchFailed = (e) => ({ type: EXAMPLE_FETCH_FAILED, e });