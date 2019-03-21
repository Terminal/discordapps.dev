import React, { Component } from 'react';
import { Localise } from '../../locales';
import BotCard from '../BotCard';
import styles from './index.module.scss';
import { injectIntl, FormattedMessage } from 'react-intl';

class BotCollection extends Component {
  render() {
    const { bots, limit, hidden } = this.props;

    let listed = bots
      .filter(bot => bot.contents.length > 0);
    
    if (limit) {
      listed = listed.slice(0, 8);
    }

    // Remove hidden bots
    if (hidden) {
      listed = listed.filter(bot => bot.hide === false);
    }

    return (
      <div className={styles.collection}>
        {
          listed.length > 0 ?
            // Find bots that fit in the category
            listed
              .map(bot => {
                const contents = Localise(bot.contents, this.props.intl.locale);
                return [bot, contents];
              })
              .map(([bot, contents]) => (
                <BotCard key={bot.id} bot={bot} contents={contents} />
              )) :
            <FormattedMessage id="pages.list.empty" />
        }
      </div>
    )
  }
}

export default injectIntl(BotCollection);
