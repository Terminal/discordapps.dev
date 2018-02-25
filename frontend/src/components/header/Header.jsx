/**
    ls.terminal.ink Discord Bot List Server
    Copyright (C) 2018 Moustacheminer Server Services
    Copyright (C) 2018 Terminal.ink

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from 'react';
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
