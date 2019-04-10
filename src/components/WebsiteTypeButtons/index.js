import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import { FormattedMessage } from 'react-intl';

import styles from './index.module.scss';
import LinkButton from '../LinkButton';
import Modesta from '../../data/Modesta';
import ConstructCSS from '../../helpers/ConstructCSS';

class WebsiteTypeButtons extends Component {
  render() {
    return (
      <div className={styles.websiteTypeButtons}>
        {/* <LinkButton to="/" className={ConstructCSS(Modesta.secondary, styles.btn)}><FormattedMessage id="types.all" /></LinkButton> */}
        <LinkButton to="/" className={ConstructCSS(Modesta.secondary, styles.btn)}><FormattedMessage id="types.bots" /></LinkButton>
        <LinkButton to="/rpc" className={ConstructCSS(Modesta.secondary, styles.btn)}><FormattedMessage id="types.rpc" /></LinkButton>
      </div>
    )
  }
}


export default WebsiteTypeButtons;
