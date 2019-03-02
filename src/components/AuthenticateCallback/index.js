import React, { Component } from 'react';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';

class AuthenticateCallback extends Component {
  render() {
    return (
      <div className={`${modesta.container} ${this.props.className ? this.props.className : ''}`}>
        callback
      </div>
    )
  }
}

export default AuthenticateCallback;
