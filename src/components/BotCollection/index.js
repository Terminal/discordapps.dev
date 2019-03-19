import React, { Component } from 'react';
import { Localise } from '../../locales';
import BotCard from '../BotCard';
import styles from './index.module.scss';
import { injectIntl } from 'react-intl';

class BotCollection extends Component {
  render() {
    const { bots, limit } = this.props;

    let listed = bots;
    
    if (limit) {
      listed = listed.slice(0, 8);
    }

    return (
      <div className={styles.collection}>
        {
          // Find bots that fit in the category
          listed
            .filter(bot => bot.contents.length > 0) // Remove bots without contents
            .filter(bot => bot.hide === false) // Remove hidden bots
            .map(bot => {
              const contents = Localise(bot.contents, this.props.intl.locale);
              return [bot, contents];
            })
            .map(([bot, contents]) => (
              <BotCard key={bot.id} bot={bot} contents={contents} />
            ))
        }
      </div>
    )
  }
}

export default injectIntl(BotCollection);
