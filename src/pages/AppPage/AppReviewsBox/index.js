import React, { Component } from 'react';
import ContentBox from '../../../components/ContentBox';
import ReviewCard from '../../../components/ReviewCard';
import { FormattedMessage } from 'react-intl';
import FlexColumns from '../../../components/FlexColumns';
import ProgressBar from '../../../components/ProgressBar';
import styles from './index.module.scss';
import FlexContainer from '../../../components/FlexContainer';
import { connect } from 'react-redux';
import { fetchAuthIfNeeded } from '../../../redux/actions/auth';
import ReviewForm from '../../../components/ReviewForm';

class AppReviewsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myReview: null
    }
    this.setMyReview = this.setMyReview.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthIfNeeded());
  }
  setMyReview(review) {
    this.setState({
      myReview: review
    });
  }
  render() {
    const { bot } = this.props;
    const auth = this.props.auth.data
    const { reviews } = bot;
    const average = reviews.reduce((prev, curr) => prev + curr.rating, 0) / reviews.length;

    const counts = [0, 0, 0, 0, 0];
    reviews.forEach(review => counts[review.rating - 1]++);
    const proportions = counts.map(count => count / reviews.length);

    const myReview = auth ? reviews.find(review => review.author === auth.id) : null;
    const isOwner = auth ? bot.authors.some(author => author.id === auth.id) : false;

    return (
      <ContentBox>
        <h3><FormattedMessage id="pages.reviews.title" /></h3>
        <FlexColumns>
          <FlexColumns columns={4} className={styles.averageContainer}>
            <span className={styles.average}>{average.toFixed(1) !== 'NaN' ? average.toFixed(1) : null}</span>
          </FlexColumns>
          <FlexColumns columns={8}>
            <FlexContainer><span className={styles.progressText}>5</span><ProgressBar className={styles.progress} colour="emerald"   proportion={proportions[4]} /></FlexContainer>
            <FlexContainer><span className={styles.progressText}>4</span><ProgressBar className={styles.progress} colour="greenSea"  proportion={proportions[3]} /></FlexContainer>
            <FlexContainer><span className={styles.progressText}>3</span><ProgressBar className={styles.progress} colour="sunFlower" proportion={proportions[2]} /></FlexContainer>
            <FlexContainer><span className={styles.progressText}>2</span><ProgressBar className={styles.progress} colour="carrot"    proportion={proportions[1]} /></FlexContainer>
            <FlexContainer><span className={styles.progressText}>1</span><ProgressBar className={styles.progress} colour="alizarin"  proportion={proportions[0]} /></FlexContainer>
          </FlexColumns>
        </FlexColumns>
        <div>
          {
            // If there's a review by the owner, show it.
            this.state.myReview || myReview ?
              <ReviewCard review={this.state.myReview || myReview} bot={bot} /> :
              (
                isOwner ?
                  null :
                  <ReviewForm setMyReview={this.setMyReview} bot={bot} />
              )
          }
          {
            reviews
              .slice(0, 8)
              .filter(review => auth ? review.author !== auth.id : true)
              .map((review, index) => <ReviewCard key={index} review={review} bot={bot} />)
          }
        </div>
      </ContentBox>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(AppReviewsBox);
