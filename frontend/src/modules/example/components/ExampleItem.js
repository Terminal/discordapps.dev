import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class ExampleItem extends Component {
    static propTypes = {
        example: PropTypes.object.isRequired,
    };

    render() {
        return (
            <li>
                <h2>{example.name}</h2>
            </li>
        )
    }
}