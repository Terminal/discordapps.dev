import React, { Component } from 'react';
import Locations from '../../data/Locations';
import styles from './index.module.scss';
import { FormattedMessage } from 'react-intl';
import LazyImage from '../LazyImage';
import FlexContainer from '../FlexContainer';

class ReviewCard extends Component {
  render() {
    const { review } = this.props
    return (
      <FlexContainer className={styles.card}>
        <FormattedMessage id="alt.avatar" values={{name: review.username}}>
          {(message) => (
            <LazyImage className={styles.avatar} alt={message} src={`${Locations.server}${review.cachedAvatar}` || Locations.logo} />
          )}
        </FormattedMessage>
        <div>
          <h6>{review.username}<span className={styles.discriminator}>#{review.discriminator}</span></h6>
          <p className={styles.description}>{review.text}</p>
        </div>
      </FlexContainer>
    )
  }
}

export default ReviewCard;
