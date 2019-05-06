import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Locations from '../../data/Locations';
import { forceFetchAuth } from '../../redux/actions/auth';

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
