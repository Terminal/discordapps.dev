import React, { Component } from 'react';
import colours from '../../scss/colours.module.scss';
import elements from '../../scss/elements.module.scss';
import styles from './index.module.scss';
import Modesta from '../../data/Modesta';

class ContentBox extends Component {
  render() {
    return (
      <div className={`${Modesta.boxShadow} ${colours.container} ${elements.roundedCorners} ${styles.container} ${this.props.className ? this.props.className : ''}`}>
        {this.props.children}
      </div>
    )
  }
}

export default ContentBox;
