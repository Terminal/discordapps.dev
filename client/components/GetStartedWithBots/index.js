import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Locations from '../../data/Locations';
import ContentBox from '../ContentBox';
import Flex from '../FlexColumns';
import LocalisedHyperlink from '../LocalisedHyperlink';

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
              <LocalisedHyperlink to={Locations.tutorials} hash="howto">
                <FormattedMessage id="components.pleaseaddyourbotpleasethanks.innovate.heading" />
              </LocalisedHyperlink>
            </h5>
            <FormattedMessage id="components.pleaseaddyourbotpleasethanks.innovate.content" />
          </Flex>
          <Flex columns={4}>
            <h5>
              <a href={Locations.add}>
                <FormattedMessage id="components.pleaseaddyourbotpleasethanks.add.heading" />
              </a> 
            </h5>
            <FormattedMessage id="components.pleaseaddyourbotpleasethanks.add.content" />
          </Flex>
        </Flex>
      </ContentBox>
    )
  }
}

export default PleaseAddYourBotPleaseThanks;
