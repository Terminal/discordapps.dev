import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Configuration from '../data/Configuration';

class BotPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bot: null
    };
  }

  componentDidMount() {
    // Check if the bot has been injected
    if (!this.state.bot) {
      fetch(`${Configuration.server}/${this.props.intl.locale}/reactjs/v1/bots/id/${this.props.match.params.id}`)
        .then(res => res.json())
        .then((data) => {
          if (data.ok) {
            this.setState({
              bot: data.data
            })
          }
        })
    }
  }

  render() {
    if (!this.state.bot) {
      return (
        <Layout>
          <Container>
            <p>loading...</p>
          </Container>
        </Layout>
      )
    }

    const { bot } = this.state

    return (
      <Layout>
        <Container>
          <h1>
            {bot.contents[0].name}
          </h1>
          <h2>
            {bot.contents[0].description}
          </h2>
        </Container>
      </Layout>
    );
  }
}

export default injectIntl(BotPage);
