import React, { Component } from 'react';
import styles from './index.module.scss';
import Modesta from '../../data/TwitterEmojis';

class BtecParallax extends Component {
  render() {
    return (
      <div className={`${styles.fullscreen}`}>
        <div className={`${styles.image} ${this.props.src ? styles.loaded : ''}`}
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
