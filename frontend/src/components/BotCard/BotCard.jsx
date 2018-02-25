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
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default props => (
  <Col xs={12} sm={6} md={4} lg={3}>
    <div className="BotCard media">
      <img className="d-flex mr-3 icon"
        src={props.bot.avatar}
        alt="Failed to load avatar"
        width="64"
        height="64" />
      <div className="media-body">
        <h3 className="mt-0">
          {props.bot.name}
          <span className="badge badge-default left">
            {props.bot.count} guilds
          </span>
          <span className="badge badge-info left">
            {props.bot.owner}
          </span>
          {props.bot.owners && props.bot.owners.map(owner => (
            <span className="badge badge-info left">
              {owner}
            </span>
          ))}
        </h3>
        <span>
          {props.bot.shortDesc}
        </span>
      </div>
    </div>
  </Col>
)
