import React, { Component } from 'react';
import LocalisedHyperlink from '../LocalisedHyperlink';
import ContentBox from '../ContentBox';
import Flex from '../FlexColumns';

class PleaseAddYourBotPleaseThanks extends Component {
  render() {
    return (
      <ContentBox>
        <Flex>
          <Flex columns="4">
            <h4>Get started with Discord Bots</h4>
          </Flex>
          <Flex columns="4">
            <h5>
              <a href="https://github.com/Terminal/ls.terminal.ink/wiki">
                Start Innovating
              </a>
            </h5>
            Learn to create your own Discord bot for your own personal server.
          </Flex>
          <Flex columns="4">
            <h5>
              <LocalisedHyperlink to="/add">
                Add your bot
              </LocalisedHyperlink>
            </h5>
            Share your creation to the world:
            Let others enhance their server experience with your bot.
          </Flex>
        </Flex>
      </ContentBox>
    )
  }
}

export default PleaseAddYourBotPleaseThanks;
