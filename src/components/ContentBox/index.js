import React, { Component } from 'react';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import colours from '../../scss/colours.module.scss';
import elements from '../../scss/elements.module.scss';
import styles from './index.module.scss';

class ContentBox extends Component {
  render() {
    return (
      <div className={`${modesta['box-shadow']} ${colours.container} ${elements.roundedCorners} ${styles.container} ${this.props.className ? this.props.className : ''}`}>
        {this.props.children}
      </div>
    )
  }
}

export default ContentBox;
