import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../components/Container';
import Layout from '../components/Layout';
import ContentBox from '../components/ContentBox';
import PleaseAddYourBotPleaseThanks from '../components/PleaseAddYourBotPleaseThanks';
import { Prompt } from 'react-router-dom';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kliksphilip: 0
    };
    this.klick = this.klick.bind(this);
  }
  klick() {
    this.setState({
      kliksphilip: this.state.kliksphilip + 1
    });
  }
  render() {
    return (
      <Layout>
        <Container>
          <FormattedMessage id="pages.game.leave">
            {message => <Prompt message={message} />}
          </FormattedMessage>
          <ContentBox>
            <h2>
              <FormattedMessage id="pages.game.title" />
            </h2>
            <h3>
              <FormattedMessage id="pages.game.description" />
            </h3>
            <p>
              <FormattedMessage id="pages.game.score" values={{
                kliksphilip: this.state.kliksphilip
              }}/>
            </p>
            <button onClick={this.klick}>Get a point</button>
          </ContentBox>
          <PleaseAddYourBotPleaseThanks />
        </Container>
      </Layout>
    );
  }
}

export default Game;
