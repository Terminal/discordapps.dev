import React, { Component } from 'react';
import NavbarLinks from '../NavbarLinks';
import './index.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.open = React.createRef();
    this.navside = React.createRef();
    this.darken = React.createRef();
    this.openNavbar = this.openNavbar.bind(this);
    this.closeNavbar = this.closeNavbar.bind(this);
  }

  componentDidMount() {
    this.open.current.addEventListener('click', this.openNavbar);
    document.addEventListener('click', this.closeNavbar);
  }

  componentWillUnmount() {
    this.open.current.removeEventLister('click', this.openNavbar);
    document.removeEventListener('click', this.closeNavbar);
  }

  openNavbar() {
    if (this.navside.current && this.navside.current.style) {
      this.navside.current.style.transform = 'translateX(0px)';
      this.darken.current.style.opacity = '0.8';
      this.darken.current.style.pointerEvents = 'all';
    }
  }

  closeNavbar(e) {
    if (!e.target.closest('.nav-container') && this.navside.current && this.navside.current.style) {
      this.navside.current.style.transform = 'translateX(-250px)';
      this.darken.current.style.opacity = '0';
      this.darken.current.style.pointerEvents = 'none';
    }
  }

  render() {
    return (
      <div>
        <div className="ls-desktop nav-container default">
          <h1 className="nav-title">Cool website</h1>

          <NavbarLinks />
        </div>
        <div className="ls-mobile nav-container">
          <span ref={this.open} id="menu-icon"></span>

          <div className="nav-content">
            <h4>Nice stuff</h4>
          </div>

          <NavbarLinks ref={this.navside} />
        </div>
        <div ref={this.darken} className="ls-mobile ls-navbar-darken"></div>
      </div>
    );
  }
}

export default Navbar;
