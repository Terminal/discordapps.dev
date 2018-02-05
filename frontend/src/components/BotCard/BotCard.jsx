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
