import React, { Component } from 'react';
import Modesta from '../../data/TwitterEmojis';

class ProgressBar extends Component {
  render() {
    return (
      <div className={`${this.props.className || ''}`}>
        <div className={`${Modesta[`${this.props.colour}Bar`]}`} style={{
          width: `${this.props.proportion * 100}%`
        }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default ProgressBar;
