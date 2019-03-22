import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Locations from '../../data/Locations';
import Modesta, { TwitterEmojis } from '../../data/Modesta';
import States from '../../data/States';
import { fetchAuthIfNeeded } from '../../redux/actions/auth';
import LocalisedHyperlink from '../LocalisedHyperlink';

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
        <FormattedMessage id="navbar.search">
          {message => (
            <LocalisedHyperlink aria-label={message} to="/bots/filter" query={{
              state: States.APPROVED
            }}>
              <span className={`${Modesta.emoji} ${TwitterEmojis.twaRightPointingMagnifyingGlass}`} />
            </LocalisedHyperlink>
          )}
        </FormattedMessage>
        { auth.data !== null ?
          <>
            <FormattedMessage id="navbar.add">
              {message => (
                <LocalisedHyperlink aria-label={message} to="/bots/add">
                  {message}
                </LocalisedHyperlink>
              )}
            </FormattedMessage>
            <FormattedMessage id="navbar.user">
              {message => (
                <LocalisedHyperlink aria-label={message} to="/bots/filter" query={{
                  owners: [auth.data.id],
                  hidden: false
                }}>
                  {auth.data.username}
                </LocalisedHyperlink>
              )}
            </FormattedMessage>
            <FormattedMessage id="navbar.logout">
              {message => (
                <LocalisedHyperlink aria-label={message} to="/auth/logout">
                  {message}
                </LocalisedHyperlink>
              )}
            </FormattedMessage>
            {
              auth.data.admin ?
              <>
                <FormattedMessage id="navbar.admin">
                  {message => (
                    <LocalisedHyperlink aria-label={message} to="/admin">
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

export default connect(mapStateToProps)(injectIntl(NavbarLinks));
