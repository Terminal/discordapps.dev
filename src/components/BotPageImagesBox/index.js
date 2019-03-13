import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import Slider from 'react-slick';
import styles from './index.module.scss';
import LazyImage from '../LazyImage';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Locations from '../../data/Locations';

class BotPageContentBox extends Component {
  render() {
    if (this.props.images && this.props.images.length === 0) return null;
    return (
      <ContentBox>
        <Slider
          variableWidth={true}
          infinite={false}
          arrows={false}
          dots={true}
          dotsClass={styles.dots}>
          {this.props.children}
          {this.props.images.map((image, index) => 
            <div key={index} className={styles.imageContainer}>
              <LazyImage src={`${Locations.server}${image}`} className={styles.image}/>
            </div>)}
        </Slider>
      </ContentBox>
    )
  }
}

export default BotPageContentBox;
