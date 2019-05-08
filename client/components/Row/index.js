import React, { Component } from 'react';
import { Modesta } from '../../data/Styles';

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
