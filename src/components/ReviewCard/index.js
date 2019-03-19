import React, { Component } from 'react';
import Locations from '../../data/Locations';
import styles from './index.module.scss';
import { FormattedMessage } from 'react-intl';
import LazyImage from '../LazyImage';
import FlexContainer from '../FlexContainer';
import NotALink from '../NotALink';
import { connect } from 'react-redux';
import { fetchAuthIfNeeded } from '../../redux/actions/auth';

class ReviewCard extends Component {
  constructor(props) {
    super(props);

    this.deleteReview = this.deleteReview.bind(this);

    this.state = {
      deleting: false,
      deleted: false,
      timeout: null,
      deleteClicked: false
    }
  }
  deleteReview() {
    if (!this.state.deleteClicked) {
      this.setState({
        deleteClicked: true
      })
      fetch(`${Locations.server}/bots/${this.props.bot.id}/reviews/${this.props.review.id}/delete`, {
        credentials: 'include',
        method: 'POST'
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              deleting: true,
              timeout: setTimeout(() => {
                this.setState({
                  deleted: true
                });
              }, 300)
            });
          }
        })
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthIfNeeded());
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }
  render() {
    const { review, auth } = this.props;

    let stars = '';
    for (let i = 0; i < review.rating; i++) {
      stars += '★'
    }

    if (this.state.deleted) return null;

    return (
      <FlexContainer className={styles.card} style={this.state.deleting ? {opacity: 0} : {}}>
        <FormattedMessage id="alt.avatar" values={{name: review.username}}>
          {(message) => (
            <LazyImage className={styles.avatar} alt={message} src={`${Locations.server}${review.cachedAvatar}` || Locations.logo} />
          )}
        </FormattedMessage>
        <div className={styles.textContainer}>
          <h6>{review.username}<span className={styles.discriminator}>#{review.discriminator}</span></h6>
          <p className={styles.description}>{review.text}</p>
          <span className={styles.stars}>{stars}</span>
        </div>
        {
          // Allow the review to be deleted by the owner, or by an admin
          review.isCurrentUserOwner || (auth && auth.data && auth.data.admin) ?
            <NotALink onClick={this.deleteReview}>Delete</NotALink> :
            null
        }
      </FlexContainer>
    )
  }
}


const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(ReviewCard);
