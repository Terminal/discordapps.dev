import React, { Component } from 'react';
import styles from './index.module.scss';
import Modesta from '../../data/Modesta';

class BtecParallax extends Component {
  render() {
    return (
      <div className={`${Modesta.fullscreen} ${styles.fullscreen}`}>
        <div className={`${Modesta.background} ${styles.image} ${this.props.src ? styles.loaded : ''}`}
        style={this.props.src ? {
          backgroundImage: `url('${this.props.src}')`
        }: {}} />
        {/* <div className={modesta['center-object']}>
        </div> */}
      </div>
    )
  }
}

export default BtecParallax;
