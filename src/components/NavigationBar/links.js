import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { fetchAuthIfNeeded } from '../../redux/actions/auth';
import LocalisedHyperlink from '../LocalisedHyperlink';
import { Link } from 'react-router-dom';
import Locations from '../../data/Locations';
import Modesta, { TwitterEmojis } from '../../data/Modesta';

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
              <span className={`${Modesta.emoji} ${TwitterEmojis.twaGlobeShowingEuropeAfrica}`} />
            </LocalisedHyperlink>
          )}
        </FormattedMessage>
        { auth.data !== null ?
          <>
            <FormattedMessage id="navbar.add">
              {message => (
                <Link aria-label={message} to="/bots/add">
                  {message}
                </Link>
              )}
            </FormattedMessage>
            <FormattedMessage id="navbar.user">
              {message => (
                <Link aria-label={message} to="/me">
                  {auth.data.username}
                </Link>
              )}
            </FormattedMessage>
            <FormattedMessage id="navbar.logout">
              {message => (
                <Link aria-label={message} to="/auth/logout">
                  {message}
                </Link>
              )}
            </FormattedMessage>
            {
              auth.data.admin ?
              <>
                <FormattedMessage id="navbar.admin">
                  {message => (
                    <LocalisedHyperlink to="/admin">
                      {message}
                    </LocalisedHyperlink>
                  )}
                </FormattedMessage>
              </>
              : null
            }
          </> :
          <>
            <FormattedMessage id="navbar.login">
              {message => (
                <a aria-label={message} href={`${Locations.server}/auth/site?to=${encodeURIComponent(href)}`}>
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
