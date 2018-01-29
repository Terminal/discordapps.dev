import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExampleItem from './ExampleItem';

export default class ExampleList extends Component {
    static propTypes = {
        example: PropTypes.array.isRequired,
    };

    render() {
        if(this.props.example.length !== 0) {
            return (
                <ul className="example-list">
                {this.props.example.map(example => {
                    <ExampleItem key={example.id} example={example} />
                })}
                </ul>
            )
        }
    }
}