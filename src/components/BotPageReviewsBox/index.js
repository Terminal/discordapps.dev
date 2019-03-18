import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import ReviewCard from '../ReviewCard';
import { FormattedMessage } from 'react-intl';
import FlexColumns from '../FlexColumns';
import ProgressBar from '../ProgressBar';
import styles from './index.module.scss';
import FlexContainer from '../FlexContainer';

class BotPageReviewsBox extends Component {
  render() {
    const reviews = this.props.bot.reviews;
    const average = reviews.reduce((prev, curr) => prev + curr.rating, 0) / reviews.length;

    const counts = [0, 0, 0, 0, 0];
    reviews.forEach(review => counts[review.rating - 1]++);
    const proportions = counts.map(count => count / reviews.length);

    return (
      <ContentBox>
        <h3><FormattedMessage id="pages.reviews.title" /></h3>
        <FlexColumns>
          <FlexColumns columns={4} className={styles.averageContainer}>
            <span className={styles.average}>{Number.isNaN(average.toFixed(1)) ? average.toFixed(1) : null}</span>
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
            reviews
              .slice(0, 8)
              .map((review, index) => <ReviewCard key={index} review={review} />)
          }
        </div>
      </ContentBox>
    )
  }
}

export default BotPageReviewsBox;
