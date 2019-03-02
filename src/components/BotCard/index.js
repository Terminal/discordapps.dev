import React, { Component } from 'react';
import Configuration from '../../data/Configuration';
// import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import styles from './index.module.scss';
import { FormattedMessage } from 'react-intl';
import LocalisedHyperlink from '../LocalisedHyperlink';

class BotCard extends Component {
  render() {
    const { bot } = this.props
    return (
      <div className={styles.card}>
        <LocalisedHyperlink className={styles.link}>
          <FormattedMessage id="alt.avatar" values={{name: bot.contents.name}}>
            {(message) => (
              <img className={styles.avatar} alt={message} src={`${Configuration.server}${bot.cachedImages.avatar}` || Configuration.logo} />
            )}
          </FormattedMessage>
          <div>
            <h6>{bot.contents.name}</h6>
            <p className={styles.description}>{bot.contents.description}</p>
          </div>
        </LocalisedHyperlink>
      </div>
    )
  }
}

export default BotCard;
