import React, { Component } from 'react';
import styles from './index.module.scss';
import Modesta from '../../data/Modesta';
import ConstructCSS from '../../helpers/ConstructCSS';

class Button extends Component {
  render() {
    return (
      <span {...this.props} className={ConstructCSS(Modesta.btn, Modesta.boxShadow, styles.btn, this.props.className)}>{this.props.children}</span>
    )
  }
}


export default Button;
