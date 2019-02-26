import React, { Component } from 'react';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import styles from './index.module.scss';

class FlexColumns extends Component {
  render() {
    if (this.props.columns) return (
      <div className={`${modesta[`col-xs-${this.props.columns}`]}`}>
        {this.props.children}
      </div>
    )
    return (
      <div className={`${modesta['flex-grid']} ${styles.flexGrid}`}>
        {this.props.children}
      </div>
    )
  }
}

export default FlexColumns;
