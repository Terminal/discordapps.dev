import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import languages from '../../locales';
import { TwitterEmojis } from '../../data/Styles';
import styles from './index.module.scss';
import { Modesta } from '../../data/Styles';
import ConstructCSS from '../../helpers/ConstructCSS';

export default ({
  unlocalisedPath = ''
}) => (
  <div className={styles.flags}>
    {
      languages
        .filter(language => language.translations)
        .map(language => (
          <FormattedMessage id={`locales.${language.code}`} key={language.code}>
            {(message) => (
              <Link
                to={`/${language.code}${unlocalisedPath}`}
                className={ConstructCSS(Modesta.emoji, Modesta.tooltip, styles.tooltip, TwitterEmojis[language.flag.replace(/-([a-z0-9])/g, (capture) => capture[1].toUpperCase()).replace('-', '')], styles.flag)}
                aria-label={message}
                data-tooltip={message}
                title={message}></Link>
            )}
          </FormattedMessage>
        ))
    }
  </div>
)
