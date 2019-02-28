import React, { Component } from 'react';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';

class Container extends Component {
  render() {
    return (
      <div className={`${modesta.container} ${this.props.className ? this.props.className : ''}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Container;
