import React, { Component } from 'react';
import Modesta from '../../data/Modesta';
import ConstructCSS from '../../helpers/ConstructCSS';
import styles from './index.module.scss';

class Button extends Component {
  render() {
    return (
      <span {...this.props} className={ConstructCSS(styles.btn, Modesta.btn, Modesta.boxShadow, this.props.className)}>{this.props.children}</span>
    )
  }
}


export default Button;
