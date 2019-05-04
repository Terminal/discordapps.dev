import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ContentBox from '../../../components/ContentBox';
import NotALink from '../../../components/NotALink';

class SwitchLocalesCard extends Component {
  render() {
    const { app } = this.props;
    return (
      <ContentBox>
        <p>
          {
            app.contents.length === 1 ?
            <FormattedMessage id="pages.apps.oneLang" /> :
            <FormattedMessage id="pages.apps.otherLang" />
          }
          <ul>
            {
              app.contents
                .map(unlocalisedContents =>
                  <li key={unlocalisedContents.locale}>
                    {
                      contents.locale === unlocalisedContents.locale ?
                      <span className={styles.used}>
                        <FormattedMessage id={`locales.${unlocalisedContents.locale}`} />
                      </span> :
                      <NotALink onClick={() => this.setLocale(unlocalisedContents.locale)}>
                        <FormattedMessage id={`locales.${unlocalisedContents.locale}`} />
                      </NotALink>
                    }
                  </li>
                )
            }
          </ul>
        </p>
      </ContentBox>
    )
  }
}

export default SwitchLocalesCard;
