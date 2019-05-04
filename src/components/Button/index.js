import React, { Component } from 'react';
import styles from './index.module.scss';
import Modesta from '../../data/TwitterEmojis';
import ConstructCSS from '../../helpers/ConstructCSS';

class Button extends Component {
  render() {
    return (
      <span {...this.props} className={styles.btn}>{this.props.children}</span>
    )
  }
}


export default Button;
