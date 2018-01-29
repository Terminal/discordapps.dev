import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';

import 'normalize.css/normalize.css';
import '../styling/main.scss';

export default class Application extends Component {
	render() {
		return (
			<div className="app">
				<h1>hello</h1>
				<Route exact path="/" component={Home} />
			</div>
		);
	}
}
