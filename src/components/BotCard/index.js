import React, { Component } from 'react';
import Locations from '../../data/Locations';
import styles from './index.module.scss';
import { FormattedMessage } from 'react-intl';
import LocalisedHyperlink from '../LocalisedHyperlink';
import LazyImage from '../LazyImage';

class BotCard extends Component {
  render() {
    const { bot, contents } = this.props

    const supported = [];

    if (bot.flags.win) {
      supported.push('Windows');
    }

    if (bot.flags.mac) {
      supported.push('Mac');
    }

    if (bot.flags.linux) {
      supported.push('Linux');
    }

    return (
      <div className={styles.card}>
        <LocalisedHyperlink to={`/${bot.type}/${bot.id}`} className={styles.link}>
          <FormattedMessage id="alt.avatar" values={{name: contents.name}}>
            {(message) => (
              <LazyImage className={styles.avatar} alt={message} src={`${Locations.server}${bot.cachedImages.avatar}` || Locations.logo} />
            )}
          </FormattedMessage>
          <div>
            <h6>{contents.name}</h6>
            <p className={styles.description}>{contents.description}</p>
            {
              bot.flags.win || bot.flags.mac || bot.flags.linux ?
              <p className={styles.supportList}>
                <FormattedMessage id="pages.rpc.supports" values={{
                  operatingSystems: supported.join(', ')
                }}/>
              </p>
              : null
            }
          </div>
        </LocalisedHyperlink>
      </div>
    )
  }
}

export default BotCard;
