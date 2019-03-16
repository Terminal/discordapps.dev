import React, { Component } from 'react';
import styles from './index.module.scss';

class PrefixLabel extends Component {
  render() {
    return (
      <span className={`${styles.prefix} ${this.props.className || ''}`}>
        {this.props.children}
      </span>
    )
  }
}

export default PrefixLabel;
