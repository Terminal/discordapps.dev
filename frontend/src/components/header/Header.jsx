import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#brand">Terminal.ink Bot List</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/">
          <NavItem eventKey="1">
            Home
          </NavItem>
        </LinkContainer>
        <NavItem eventKey="2" href="https://docs.terminal.ink/ls">
          Docs
        </NavItem>
        {/* <NavDropdown eventKey="3" title="Dropdown" id="nav-dropdown">
          <MenuItem eventKey="3.1">Action</MenuItem>
          <MenuItem eventKey="3.2">Another action</MenuItem>
          <MenuItem eventKey="3.3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="3.4">Separated link</MenuItem>
        </NavDropdown> */}
      </Nav>
      {/* <Nav pullRight>
        <NavItem eventKey="4" href="#">
          Link Right
        </NavItem>
        <NavItem eventKey="5" href="#">
          Link Right
        </NavItem>
      </Nav> */}
    </Navbar.Collapse>
  </Navbar>
);
