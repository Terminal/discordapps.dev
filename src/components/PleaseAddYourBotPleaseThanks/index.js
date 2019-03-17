import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Locations from '../../data/Locations';
import { fetchAuthIfNeeded } from '../../redux/actions/auth';
import { injectIntl } from 'react-intl';
import ContentBox from '../ContentBox';
import Flex from '../FlexColumns';
import LocalisedHyperlink from '../LocalisedHyperlink';

class PleaseAddYourBotPleaseThanks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthIfNeeded());
  }
  render() {
    const href = typeof window !== 'undefined' ? `${window.location.origin}/bots/add` : 'https://discordapps.dev';

    return (
      <ContentBox>
        <Flex>
          <Flex columns={4}>
            <h4>
              <FormattedMessage id="components.pleaseaddyourbotpleasethanks.title" />
            </h4>
          </Flex>
          <Flex columns={4}>
            <h5>
              <a href={Locations.wiki}>
                <FormattedMessage id="components.pleaseaddyourbotpleasethanks.innovate.heading" />
              </a>
            </h5>
            <FormattedMessage id="components.pleaseaddyourbotpleasethanks.innovate.content" />
          </Flex>
          <Flex columns={4}>
            <h5>
              {this.props.auth.data === null ?
                <a href={`${Locations.server}/auth/site?to=${encodeURIComponent(href)}`}>
                  <FormattedMessage id="components.pleaseaddyourbotpleasethanks.add.heading" />
                </a> :
                <LocalisedHyperlink to="/bots/add">
                  <FormattedMessage id="components.pleaseaddyourbotpleasethanks.add.heading" />
                </LocalisedHyperlink>
              }
            </h5>
              <FormattedMessage id="components.pleaseaddyourbotpleasethanks.add.content" />
          </Flex>
        </Flex>
      </ContentBox>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(injectIntl(PleaseAddYourBotPleaseThanks));
