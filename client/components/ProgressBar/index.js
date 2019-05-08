import React, { Component } from 'react';
import { Modesta } from '../../data/Styles';

class ProgressBar extends Component {
  render() {
    return (
      <div className={`${Modesta.progressContainer} ${this.props.className || ''}`}>
        <div className={`${Modesta.progressBar} ${Modesta[`${this.props.colour}Bar`]}`} style={{
          width: `${this.props.proportion * 100}%`
        }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default ProgressBar;
