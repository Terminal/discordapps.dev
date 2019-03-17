import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Locations from '../data/Locations';
import BtecParallax from '../components/BtecParallax';
import BotPageContentBox from '../components/BotPageContentBox';
import BotPageImagesBox from '../components/BotPageImagesBox';
import BotPageInfoBox from '../components/BotPageInfoBox';
import YouTube from '../components/YouTube';
import { Helmet } from 'react-helmet';
import BotPageLinks from '../components/BotPageLinks';
import NotFound from './NotFound';
import { Localise } from '../locales';

class BotPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bot: null,
      notFound: false
    };
  }

  componentDidMount() {
    // Check if the bot has been injected
    if (!this.state.bot) {
      fetch(`${Locations.server}/reactjs/v1/bots/id/${this.props.match.params.id}`)
        .then(res => {
          if (res.status === 404) {
            this.setState({
              notFound: true
            });
          }
          return res.json()
        })
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
    if (this.state.notFound) {
      return (
        <NotFound />
      );
    }
    
    if (!this.state.bot) {
      return (
        <Layout>
          <Container>
            <p>loading...</p>
          </Container>
        </Layout>
      );
    }

    const { bot } = this.state
    const contents = Localise(this.state.bot.contents, this.props.intl.locale);

    return (
      <Layout>
        <Helmet>
          <title>{contents.name}</title>
        </Helmet>
        { 
          bot.cachedImages.cover ?
          <BtecParallax src={`${Locations.server}${bot.cachedImages.cover}`}/> :
          null
        }
        <Container>
          <BotPageInfoBox bot={bot} contents={contents}/>
          <BotPageImagesBox images={bot.cachedImages.preview}>
            {bot.videos.youtube ? <YouTube video={bot.videos.youtube} /> : null}
          </BotPageImagesBox>
          <BotPageContentBox page={contents.page}/>
          <BotPageLinks bot={bot} />
        </Container>
      </Layout>
    );
  }
}

export default injectIntl(BotPage);
