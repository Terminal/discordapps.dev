import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import displayCSS from '../../scss/display.module.scss';
import LocalisedHyperlink from '../LocalisedHyperlink';
import styles from './index.module.scss';
import NavbarLinks from './links';
import { Modesta } from '../../data/Styles';
import ConstructCSS from '../../helpers/ConstructCSS';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.openNavbar = this.openNavbar.bind(this);
    this.closeNavbar = this.closeNavbar.bind(this);

    this.state = {
      open: false
    }
  }

  openNavbar() {
    this.setState({
      open: true
    })
  }

  closeNavbar() {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <div className={styles.navbar}>
        <div className={`${displayCSS.desktop} ${Modesta.navContainer} ${Modesta.default}`}>
          <h1 className={Modesta.navTitle}>
            <LocalisedHyperlink to="/">
              <FormattedMessage id="site.name" />
            </LocalisedHyperlink>
          </h1>

          <div className={ConstructCSS(Modesta.sidenav, styles.sidenav)}>
            <NavbarLinks unlocalisedPath={this.props.unlocalisedPath} desktop={true} />
          </div>
        </div>
        <div className={`${displayCSS.mobile} ${Modesta.navContainer} ${styles.mobileNavbar}`}>
          <span onClick={this.openNavbar} className={Modesta.menuIcon}></span>

          <div className={`${styles.mobileNavContent} ${Modesta.navContent}`}>
            <h4 className={styles.mobileHeading}>
              <LocalisedHyperlink to="/">
                <FormattedMessage id="site.name" />
              </LocalisedHyperlink>
            </h4>
          </div>

          <div className={Modesta.sidenav} style={this.state.open ? {
            transform: 'translateX(0px)'
          } : {
            transform: 'translateX(-250px)'
          }}>
            <NavbarLinks unlocalisedPath={this.props.unlocalisedPath} />
          </div>
        </div>
        <div
          style={this.state.open ? {
            opacity: '0.8',
            pointerEvents: 'all'
          } : {}}
          className={`${styles.darken} ${displayCSS.mobile}`}
          onClick={this.closeNavbar}></div>
        {this.props.children}
      </div>
    );
  }
}

export default NavigationBar;
