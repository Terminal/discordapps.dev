import React, { Component } from 'react';
import Modesta from '../../data/Modesta';

class Row extends Component {
  render() {
    return (
      <div className={Modesta.row}>
        {this.props.children}
      </div>
    )
  }
}

export default Row;
