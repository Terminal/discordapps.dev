import React, { Component } from 'react';
import LocalisedHyperlink from '../LocalisedHyperlink';
import ContentBox from '../ContentBox';
import Flex from '../FlexColumns';
import { FormattedMessage } from 'react-intl';
import Locations from '../../data/Locations';

class PleaseAddYourBotPleaseThanks extends Component {
  render() {
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
              <LocalisedHyperlink to="/add">
                <FormattedMessage id="components.pleaseaddyourbotpleasethanks.add.heading" />
              </LocalisedHyperlink>
            </h5>
              <FormattedMessage id="components.pleaseaddyourbotpleasethanks.add.content" />
          </Flex>
        </Flex>
      </ContentBox>
    )
  }
}

export default PleaseAddYourBotPleaseThanks;
