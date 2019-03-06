import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import twitterEmojis from '../../ModestaCSS/scss/twemoji.module.scss';
import { fetchAuthIfNeeded } from '../../redux/actions/auth';
import LocalisedHyperlink from '../LocalisedHyperlink';
import { Link } from 'react-router-dom';
import Configuration from '../../data/Configuration';

class NavbarLinks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthIfNeeded());
  }
  render() {
    const href = typeof window !== 'undefined' ? window.location.href : 'https://discordapps.dev';
    const { auth } = this.props;
    return (
      <>
        <FormattedMessage id="navbar.languages">
          {message => (
            <LocalisedHyperlink aria-label={message} to="/locale">
              <span className={`${modesta.emoji} ${twitterEmojis['twa-globe-showing-europe-africa']}`} />
            </LocalisedHyperlink>
          )}
        </FormattedMessage>
        { auth.data !== null ?
          <>
            <FormattedMessage id="navbar.add">
              {message => (
                <a aria-label={message} href="#">
                  {message}
                </a>
              )}
            </FormattedMessage>
            <FormattedMessage id="navbar.user">
              {message => (
                <a aria-label={message} href="#">
                  {auth.data.username}
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
                <LocalisedHyperlink to="/admin">
                  {message}
                </LocalisedHyperlink>
              )}
            </FormattedMessage>
          </> :
          <>
            <FormattedMessage id="navbar.login">
              {message => (
                <a aria-label={message} href={`${Configuration.server}/auth/site?to=${encodeURIComponent(href)}`}>
                  {message}
                </a>
              )}
            </FormattedMessage>
          </>
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(NavbarLinks);
