import React, { Component } from 'react';
import Modesta from '../../data/TwitterEmojis';

class Column extends Component {
  render() {
    return (
      <div {...this.props} className={`${this.props.className || ''}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Column;
