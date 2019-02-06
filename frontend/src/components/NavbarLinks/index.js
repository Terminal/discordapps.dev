import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import LocalLink from '../LocalLink';
import { fetchAuthIfNeeded } from '../../redux/actions';

class NavbarLinks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthIfNeeded());
  }
  render() {
    const { auth } = this.props;
    return (
      <div ref={this.props.innerRef} className="sidenav">
        <FormattedMessage id="navbar.languages">
          {message => (
            <LocalLink aria-label={message} to="/locale">
              <span className="emoji twa-globe-showing-europe-africa" />
            </LocalLink>
          )}
        </FormattedMessage>
        <FormattedMessage id="navbar.add">
          {message => (
            <a aria-label={message} href="#">
              {message}
            </a>
          )}
        </FormattedMessage>
        { auth !== null ?
          <>
            <FormattedMessage id="navbar.user">
              {message => (
                <a aria-label={message} href="#">
                  {auth.username}
                </a>
              )}
            </FormattedMessage>
            <FormattedMessage id="navbar.logout">
              {message => (
                <a aria-label={message} href="/auth/logout">
                  {message}
                </a>
              )}
            </FormattedMessage>
            <FormattedMessage id="navbar.admin">
              {message => (
                <a aria-label={message} href="#">
                  {message}
                </a>
              )}
            </FormattedMessage>
          </> :
          <>
            <FormattedMessage id="navbar.login">
              {message => (
                <a aria-label={message} href={`/auth`}>
                  {message}
                </a>
              )}
            </FormattedMessage>
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    auth
  };
};

export default connect(mapStateToProps)(NavbarLinks);
