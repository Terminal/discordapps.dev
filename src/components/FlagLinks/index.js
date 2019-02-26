import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import twitterEmojis from '../../ModestaCSS/scss/twemoji.module.scss';
import styles from './index.module.scss';

import languages from '../../locales';

export default () => (
  <div className={styles.flags}>
    {
      languages
        .filter(language => language.translations)
        .map(language => (
          <FormattedMessage id={`locales.${language.code}`}>
            {(message) => (
              <Link
                to={`/${language.code}`}
                key={language.code}
                className={`${modesta.emoji} ${twitterEmojis[language.flag]} ${styles.flag}`}
                aria-label={message}
                title={message}></Link>
            )}
          </FormattedMessage>
        ))
    }
  </div>
)
