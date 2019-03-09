import React, { Component } from 'react';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import styles from './index.module.scss';

class BtecParallax extends Component {
  render() {
    return (
      <div className={`${modesta.fullscreen} ${styles.fullscreen}`}>
        <div className={`${modesta.background} ${styles.image} ${this.props.src ? styles.loaded : ''}`}
        style={this.props.src ? {
          backgroundImage: `url('${this.props.src}')`
        }: {}} />
        <div className={modesta['center-object']}>
          ree
        </div>
      </div>
    )
  }
}

export default BtecParallax;
