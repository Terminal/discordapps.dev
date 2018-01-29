import React, { Component } from 'react';
import { Example } from '../modules/example';

export default class Home extends Component {
	render() {
		return (
			<div>
				<h4>hello world</h4>
				<Example />
			</div>
		);
	}
}