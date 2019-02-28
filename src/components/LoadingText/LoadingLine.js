import React, { Component } from 'react';
import styles from './index.module.scss';
import elements from '../../scss/elements.module.scss';

class LoadingLine extends Component {
  render() {
    return (
      <div className={`${styles.line} ${elements.roundedCorners} ${elements.loading}`} style={{ width: `${this.props.width}%` }}></div>
    )
  }
}

export default LoadingLine;
