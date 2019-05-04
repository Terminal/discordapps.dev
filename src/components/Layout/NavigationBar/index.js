import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ConstructCSS from '../../../helpers/ConstructCSS';
import containers from '../containers.module.scss';
import LocalisedHyperlink from '../../LocalisedHyperlink';
import styles from './index.module.scss';

class NavigationBar extends Component {
  render() {
    return (
      <div className={ConstructCSS(containers.navtitle, styles.navbar)}>
        <h1>
          <LocalisedHyperlink to="/">
            <FormattedMessage id="site.name" />
          </LocalisedHyperlink>
        </h1>
      </div>
    );
  }
}

export default NavigationBar;
