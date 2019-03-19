import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Locations from '../data/Locations';
import { connect } from 'react-redux';
import { forceFetchAuth } from '../redux/actions/auth';
import { injectIntl } from 'react-intl';

class AuthenticateLogout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    fetch(`${Locations.server}/auth/logout`, {
      credentials: 'include'
    })
      .then(() => {
        dispatch(forceFetchAuth())
      })
  }
  render() {
    const { intl } = this.props;
    return (<Redirect to={`/${intl.locale}`} />)
  }
}

export default connect()(injectIntl(AuthenticateLogout));
