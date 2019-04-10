import React, { Component } from 'react';
import styles from './index.module.scss';
import Modesta from '../../data/Modesta';
import ConstructCSS from '../../helpers/ConstructCSS';
import LocalisedHyperlink from '../LocalisedHyperlink';

class LinkButton extends Component {
  render() {
    return (
      <LocalisedHyperlink to={this.props.to} className={ConstructCSS(Modesta.btn, Modesta.boxShadow, styles.btn, this.props.className)}>{this.props.children}</LocalisedHyperlink>
    )
  }
}


export default LinkButton;
