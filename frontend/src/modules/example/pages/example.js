import React, { Component } from 'react';
import connect from 'react-redux';

import PropTypes from 'prop-types';

import ExampleList from '../components/ExampleList';

export class Example extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        results: PropTypes.array.isRequired,
        error: PropTypes.string,
    };

    render() {
        return (
            <div>
                <ExampleList />
            </div>
        )
    }
}

export default connect(
    (state) => ({
        loading: isLoading(state),
        results: getResults(state),
        error: getError(state),
    }),
    (dispatch) => ({
        fetchExample: () => dispatch(fetchAction()),
    }),
)(Example);