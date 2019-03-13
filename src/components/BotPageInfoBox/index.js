import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import styles from './index.module.scss';
import LazyImage from '../LazyImage';
import Locations from '../../data/Locations';
import FlexContainer from '../FlexContainer';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import { FormattedMessage } from 'react-intl';

class BotPageInfoBox extends Component {
  render() {
    const { bot } = this.props
    return (
      <ContentBox>
        <FlexContainer>
          <div>
            <LazyImage src={`${Locations.server}${bot.cachedImages.avatar}`} className={styles.avatar} />
          </div>
          <div>
            <h3>
              {bot.contents[0].name}
            </h3>
            <p>
              {bot.contents[0].description}
            </p>
          </div>
        </FlexContainer>
        <div className={modesta['right-text']}>
          <a className={`${modesta.btn} ${modesta.discord}`} href={bot.invite}>
            <FormattedMessage id="pages.bots.invite" />
          </a>
        </div>
      </ContentBox>
    )
  }
}

export default BotPageInfoBox;
