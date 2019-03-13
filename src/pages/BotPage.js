import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Locations from '../data/Locations';
import BtecParallax from '../components/BtecParallax';
import ContentBox from '../components/ContentBox';
import BotPageContentBox from '../components/BotPageContentBox';
import LazyImage from '../components/LazyImage';
import FlexContainer from '../components/FlexContainer';
import BotPageImagesBox from '../components/BotPageImagesBox';
import BotPageInfoBox from '../components/BotPageInfoBox';
import YouTube from '../components/YouTube';

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
            });
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
        { 
          bot.cachedImages.cover ?
          <BtecParallax src={`${Locations.server}${bot.cachedImages.cover}`}/> :
          null
        }
        <Container>
          <BotPageInfoBox bot={bot}/>
          <BotPageImagesBox images={bot.cachedImages.preview}>
            {bot.videos.youtube ? <YouTube video={bot.videos.youtube} /> : null}
          </BotPageImagesBox>
          <BotPageContentBox page={bot.contents[0].page}/>
        </Container>
      </Layout>
    );
  }
}

export default injectIntl(BotPage);
