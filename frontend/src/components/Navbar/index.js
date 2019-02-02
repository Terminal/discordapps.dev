import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="nav-container">
        <span id="menu-icon"></span>

        <div className="nav-content">
          <h4>Nice stuff</h4>
        </div>

        <div id="navside" className="sidenav">
          <a href="#" className="current">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>
      </div>
    );
  }
}

export default Navbar;
