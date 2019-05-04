import React, { Component } from 'react';
import styles from './index.module.scss';
import Modesta from '../../data/TwitterEmojis';

class ContentBox extends Component {
  render() {
    return (
      <div className={`${styles.container} ${this.props.className ? this.props.className : ''}`}>
        {this.props.children}
      </div>
    )
  }
}

export default ContentBox;
