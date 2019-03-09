import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Locations from '../data/Locations';
import BtecParallax from '../components/BtecParallax';
import ContentBox from '../components/ContentBox';

class BotPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bot: null,
      cover: null
    };
  }

  componentDidMount() {
    // Check if the bot has been injected
    if (!this.state.bot) {
      fetch(`${Locations.server}/${this.props.intl.locale}/reactjs/v1/bots/id/${this.props.match.params.id}`)
        .then(res => res.json())
        .then((data) => {
          if (data.ok) {
            const bot = data.data;
            this.setState({
              bot
            })
            
            if (bot.cachedImages.cover) {
              fetch(`${Locations.server}${bot.cachedImages.cover}`)
                .then(res => res.blob())
                .then((data) => {
                  const objectURL = URL.createObjectURL(data);
                  this.setState({
                    cover: objectURL
                  });
                })
            }
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

    const { bot, cover } = this.state

    return (
      <Layout>
        <BtecParallax src={cover}/>
        <Container>
          <ContentBox>
            <h1>
              {bot.contents[0].name}
            </h1>
            <h2>
              {bot.contents[0].description}
            </h2>
          </ContentBox>
        </Container>
      </Layout>
    );
  }
}

export default injectIntl(BotPage);
