import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Prompt } from 'react-router-dom';
import Container from '../components/Container';
import ContentBox from '../components/ContentBox';
import Layout from '../components/Layout';
import PleaseAddYourBotPleaseThanks from '../components/PleaseAddYourBotPleaseThanks';

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
        <FormattedMessage id="pages.game.title">
          {gameName => (
            <FormattedMessage id="pages.game.description">
              {gameDescription => (
                <Helmet>
                  <title>{gameName}</title>
                  <meta property="og:title" content={gameName}/>
                  <meta property="og:description" content={gameDescription}/>
                  <meta name="description" content={gameDescription}/>
                </Helmet>
              )}
            </FormattedMessage>
          )}
        </FormattedMessage>
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
