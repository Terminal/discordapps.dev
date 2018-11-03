import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Link from './../Link'
import { FormattedMessage } from 'react-intl';

class Navigation extends React.Component {
  componentDidMount() {
    this.open.addEventListener('click', () => {
      if (this.navside && this.navside.style) {
        this.navside.style.transform = 'translateX(0px)';
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-container') && this.navside && this.navside.style) {
        this.navside.style.transform = 'translateX(-250px)';
      }
    });
  }

  render() {
    return (
      <div className="nav-container">
        <span ref={elem => this.open = elem} id="menu-icon"></span>
      
        <div className="nav-content">
          <h4 className="center">
            <FormattedMessage id="pages.docs.pagename">
              {(title) => (
                <Link href="/docs/">
                  { this.props.title || title }
                </Link>
              )}
            </FormattedMessage>
          </h4>
        </div>
      
        <div ref={elem => this.navside = elem} className="sidenav" style={({transform: 'translateX(-250px)'})}>
          <Link href="/">
            <FormattedMessage id="pages.bots.pagename" />
          </Link>
          <Link href="/bots/">
            <FormattedMessage id="pages.bots.shortname" />
          </Link>
          <Link href="/servers/">
            <FormattedMessage id="pages.servers.shortname" />
          </Link>
          <Link href="/tutorials/">
            <FormattedMessage id="pages.tutorials.shortname" />
          </Link>
          <Link href="/docs/">
            <FormattedMessage id="pages.docs.shortname" />
          </Link>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  title: PropTypes.string
};

export default Navigation;
