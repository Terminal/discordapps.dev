import React, { Component } from 'react';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';

class AuthenticateRedirect extends Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <div className={`${modesta.container} ${this.props.className ? this.props.className : ''}`}>
        redirect
      </div>
    )
  }
}

export default AuthenticateRedirect;
