import React, { Component } from 'react';
import LazyImage from '../LazyImage';
import styles from './index.module.scss';

class WebsiteBackgroundImage extends Component {
  render() {
    return (
      <LazyImage src={this.props.src} className={styles.background} />
    )
  }
}

export default WebsiteBackgroundImage;
