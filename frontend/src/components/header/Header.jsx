import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default () => (
  <Navbar collapseOnSelect id="navbar">
    <div className="container">
      <Navbar.Header className="navbar-header">
        <Link className="navbar-brand" to="/" href="/">Website</Link>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav id="nav">
          <LinkContainer exact to="/">
            <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer exact to="/club">
            <NavItem>Club</NavItem>
          </LinkContainer>
          <LinkContainer exact to="/contact">
            <NavItem>Contact</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <LinkContainer to="/login">
            <NavItem >Login</NavItem>
          </LinkContainer>
          <LinkContainer to="/register">
            <NavItem>register</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
);
