import React, { Component } from 'react';
import Locations from '../../data/Locations';
import styles from './index.module.scss';
import { FormattedMessage } from 'react-intl';
import LocalisedHyperlink from '../LocalisedHyperlink';
import LazyImage from '../LazyImage';

class BotCard extends Component {
  render() {
    const { bot, contents } = this.props
    const type = bot.type === 'bot' ? 'bots' : bot.type;
    return (
      <div className={styles.card}>
        <LocalisedHyperlink to={`/${type}/${bot.id}`} className={styles.link}>
          <FormattedMessage id="alt.avatar" values={{name: contents.name}}>
            {(message) => (
              <LazyImage className={styles.avatar} alt={message} src={`${Locations.server}${bot.cachedImages.avatar}` || Locations.logo} />
            )}
          </FormattedMessage>
          <div>
            <h6>{contents.name}</h6>
            <p className={styles.description}>{contents.description}</p>
          </div>
        </LocalisedHyperlink>
      </div>
    )
  }
}

export default BotCard;
