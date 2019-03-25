import React, { Component } from 'react';
import Locations from '../../data/Locations';
import styles from './index.module.scss';
import { FormattedMessage, injectIntl } from 'react-intl';
import FlexContainer from '../FlexContainer';
import { connect } from 'react-redux';
import { fetchAuthIfNeeded } from '../../redux/actions/auth';
import ContentBox from '../ContentBox';
import Modesta from '../../data/Modesta';

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.submitReview = this.submitReview.bind(this);
    this.form = React.createRef();

    this.state = {
      submitted: false,
      message: null
    }
  }
  submitReview(e) {
    e.preventDefault();
    if (!this.state.submitted) {
      const formdata = new FormData(this.form.current);
      const { auth, intl } = this.props;

      fetch(`${Locations.server}/${intl.locale}/bots/${this.props.bot.id}/reviews`, {
        credentials: 'include',
        body: formdata,
        method: 'POST'
      })
        .then(res => res.json())
        .then((res) => {
          if (res.ok) {
            this.setState({
              submitted: true
            })
            this.props.setMyReview({
              cachedAvatar: auth.data.cachedAvatar,
              date: new Date(),
              discriminator: auth.data.discriminator,
              id: null,
              isCurrentUserOwner: false,
              language: intl.locale,
              rating: formdata.get('review.rating'),
              text: formdata.get('review.text'),
              username: auth.data.username
            });
          } else {
            this.setState({
              message: res.language || res.message
            })
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
    const { auth } = this.props;

    if (this.state.submitted) return null;
    if (!auth) return null;
    if (!auth.data) return null;
    if (!auth.data.id) return null;

    return (
      <ContentBox>
        <form ref={this.form}>
          <h4><FormattedMessage id="pages.reviews.write" /></h4>
          <FlexContainer className={styles.starsContainer}>
            <input type="radio" name="review.rating" value="5" id="rating-5" /><label htmlFor="rating-5">★</label>
            <input type="radio" name="review.rating" value="4" id="rating-4" /><label htmlFor="rating-4">★</label>
            <input type="radio" name="review.rating" value="3" id="rating-3" /><label htmlFor="rating-3">★</label>
            <input type="radio" name="review.rating" value="2" id="rating-2" /><label htmlFor="rating-2">★</label>
            <input type="radio" name="review.rating" value="1" id="rating-1" /><label htmlFor="rating-1">★</label>
          </FlexContainer>
          <FormattedMessage id="pages.reviews.placeholder">
            {placeholder => <textarea name="review.text" className={Modesta.fullWidth} placeholder={placeholder}></textarea>}
          </FormattedMessage>
          <button className={`${Modesta.btn} ${Modesta.white} ${Modesta.blackText}`} onClick={this.submitReview}>
            <FormattedMessage id="forms.submit" />
          </button>
          {
            this.state.message ?
            <ContentBox className={Modesta.alizarin}>
              <p>
                <FormattedMessage id={this.state.message} />
              </p>
            </ContentBox> :
            null
          }
        </form>
      </ContentBox>
    )
  }
}


const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(injectIntl(ReviewForm));
