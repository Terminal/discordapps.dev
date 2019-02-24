import React from 'react';
import PropTypes from 'prop-types';

import LocalLink from '../LocalLink';
import { FormattedMessage } from 'react-intl';
import NavigationLinks from './links';

import styles from './style.module.scss';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';

class Navigation extends React.Component {
  constructor(stuff) {
    super(...stuff);

    this.open = React.createRef();
    this.navside = React.createRef();
  }
  componentDidMount() {
    this.open.current.addEventListener('click', () => {
      if (this.navside.current) {
        this.navside.current.style.transform = 'translateX(0px)';
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest(modesta.navContainer) && this.navside.current.style) {
        this.navside.current.style.transform = 'translateX(-250px)';
      }
    });
  }

  render() {
    return (
      <div>
        <div className={modesta.navContainer}>
          <span ref={this.open} className={modesta.menuIcon}></span>
          <h1 className={`${modesta.navTitle} ${styles.title}`}>
            <LocalLink to="/">
              <FormattedMessage id="site.name" />
            </LocalLink>
          </h1>
          <div ref={this.navside} className={modesta.sidenav} style={({transform: 'translateX(-250px)'})}>
            <NavigationLinks />
          </div>
        </div>
        <div className={styles.navContainerContainer}>
          <div className="nav-container default">
            <h1 className="nav-title">
              <LocalLink to="/">
                <FormattedMessage id="site.name" />
              </LocalLink>
            </h1>
            <div className="sidenav">
              <NavigationLinks />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  title: PropTypes.string
};

export default Navigation;
