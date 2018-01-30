import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import DocsPage from './DocsPage';
import Header from './../components/header/Header';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class Application extends Component {
	render() {
		return (
			<div className="app">
				<Header />
				<h1>ls.terminal.ink</h1>
				<Route exact path="/" component={Home} />
				<Route exact path="/docs" component={DocsPage} />
			</div>
		);
	}
}
