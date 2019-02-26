import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import displayCSS from '../../scss/display.module.scss';
import LocalisedHyperlink from '../LocalisedHyperlink';
import styles from './index.module.scss';
import NavbarLinks from './links';

class NavigationBar extends Component {
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
    this.darken.current.addEventListener('click', this.closeNavbar);
  }

  componentWillUnmount() {
    // Don't keep stuff hanging there in the background
    this.open.current.removeEventListener('click', this.openNavbar);
    this.darken.current.removeEventListener('click', this.closeNavbar);
  }

  openNavbar() {
    if (this.navside.current && this.navside.current.style) {
      this.navside.current.style.transform = 'translateX(0px)';
      this.darken.current.style.opacity = '0.8';
      this.darken.current.style.pointerEvents = 'all';
    }
  }

  closeNavbar() {
    this.navside.current.style.transform = 'translateX(-250px)';
    this.darken.current.style.opacity = '0';
    this.darken.current.style.pointerEvents = 'none';
  }

  render() {
    return (
      <div>
        <div className={`${displayCSS.desktop} ${modesta['nav-container']} ${styles.desktopNavbar} ${modesta.default}`}>
          <h1 className={modesta['nav-title']}>
            <LocalisedHyperlink to="/">
              <FormattedMessage id="site.name" />
            </LocalisedHyperlink>
          </h1>

          <div className={modesta.sidenav}>
            <NavbarLinks />
          </div>
        </div>
        <div className={`${displayCSS.mobile} ${modesta['nav-container']} ${styles.mobileNavbar}`}>
          <span ref={this.open} className={modesta['menu-icon']}></span>

          <div className={`${styles.mobileNavContent} ${modesta['nav-content']}`}>
            <h4 className={styles.mobileHeading}>
              <FormattedMessage id="site.name" />
            </h4>
          </div>

          <div className={modesta.sidenav} ref={this.navside}>
            <NavbarLinks />
          </div>
        </div>
        <div ref={this.darken} className={`${styles.darken} ${displayCSS.mobile}`}></div>
      </div>
    );
  }
}

export default NavigationBar;
