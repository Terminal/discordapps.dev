import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Locations from '../data/Locations';
import { connect } from 'react-redux';
import { forceFetchAuth } from '../redux/actions/auth';

class AuthenticateLogout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(forceFetchAuth())
    fetch(`${Locations.server}/auth/logout`, {
      credentials: 'include'
    })
  }
  render() {
    return (<Redirect to="/" />)
  }
}

export default connect()(AuthenticateLogout);
