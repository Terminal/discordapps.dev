import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import styles from './index.module.scss';
import elementsStyle from '../../scss/elements.module.scss';

import Locations from '../../data/Locations';
import ModalImage from '../ModalImage';

class BotPageContentBox extends Component {
  render() {
    if (this.props.images && this.props.images.length === 0) return null;
    return (
      <ContentBox>
        <div className={`${styles.sliderContainer} ${elementsStyle.scrollbar}`}>
          <div className={styles.slider}>
            {this.props.children}
            {this.props.images.map((image, index) => 
              <ModalImage src={`${Locations.cdn}${image}`} className={styles.image} key={index}/>
            )}
          </div>
          <div className={styles.botListDotSpace}>
            {/* Padding between scrollbar and the images */}
          </div>
        </div>
      </ContentBox>
    )
  }
}

export default BotPageContentBox;
