import React, { Component } from 'react';
import styles from './index.module.scss';

class NotALink extends Component {

  render() {
    return (
      <span className={`${styles.link} ${this.props.className}`} {...this.props}>
        {this.props.children}
      </span>
    )
  }
}

export default NotALink;
