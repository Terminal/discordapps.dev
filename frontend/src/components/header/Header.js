import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Header extends Component {
	render() {
		return (
			<Nav pullRight>
				<LinkContainer to="/home">
					<NavItem eventKey={1}>Home</NavItem>
				</LinkContainer>
				<LinkContainer to="/book">
					<NavItem eventKey={2}>Book Inv</NavItem>
				</LinkContainer>
				<NavDropdown eventKey={3} title="Authorization" id="basic-nav-dropdown">
					<LinkContainer to="/logout">
						<MenuItem eventKey={3.1}>Logout</MenuItem>
					</LinkContainer>
				</NavDropdown>
			</Nav>
		)
	}
}
