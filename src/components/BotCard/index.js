import React, { Component } from 'react';
import Locations from '../../data/Locations';
// import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import styles from './index.module.scss';
import { FormattedMessage } from 'react-intl';
import LocalisedHyperlink from '../LocalisedHyperlink';
import LazyImage from '../LazyImage';

class BotCard extends Component {
  render() {
    const { bot } = this.props
    return (
      <div className={styles.card}>
        <LocalisedHyperlink to={`/bots/${bot.id}`} className={styles.link}>
          <FormattedMessage id="alt.avatar" values={{name: bot.contents.name}}>
            {(message) => (
              <LazyImage className={styles.avatar} alt={message} src={`${Locations.server}${bot.cachedImages.avatar}` || Locations.logo} />
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
