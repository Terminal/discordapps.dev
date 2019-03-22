import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import BotPageContentBox from '../components/BotPageContentBox';
import BotPageImagesBox from '../components/BotPageImagesBox';
import BotPageInfoBox from '../components/BotPageInfoBox';
import BotPageLinks from '../components/BotPageLinks';
import BotPageReviewsBox from '../components/BotPageReviewsBox';
import BtecParallax from '../components/BtecParallax';
import Container from '../components/Container';
import Layout from '../components/Layout';
import LoadingContainer from '../components/LoadingContainer';
import Youku from '../components/Youku';
import YouTube from '../components/YouTube';
import Locations from '../data/Locations';
import { Localise } from '../locales';
import NotFound from './NotFound';
import { fetchABot } from '../redux/actions/bot';
import BotPageSetStateBox from '../components/BotPageSetStateBox';

class BotPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bot: null
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    // Check if the bot has been injected
    dispatch(fetchABot({match}));
  }

  render() {
    const bot = this.props.bot.data
    const status = this.props.bot.status

    if (status === 404) {
      if (this.props.staticContext) this.props.staticContext.status = 404;
      return (
        <NotFound />
      );
    }
    
    if (!bot) {
      return (
        <Layout>
          <LoadingContainer />
        </Layout>
      );
    }

    const contents = Localise(bot.contents, this.props.intl.locale);

    return (
      <Layout>
        <Helmet>
          <title>{contents.name}</title>
          <meta property="og:title" content={contents.name}/>
          <meta property="og:description" content={contents.description}/>
          <meta name="description" content={contents.description}/>
          <meta property="og:image" content={`${Locations.server}${bot.cachedImages.avatar}`} />
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
            {bot.videos.youku ? <Youku video={bot.videos.youku} /> : null}
          </BotPageImagesBox>
          <BotPageContentBox page={contents.page}/>
          <BotPageReviewsBox bot={bot} />
          <BotPageLinks bot={bot} />
          <BotPageSetStateBox bot={bot} />
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { bot } = state;
  return { bot };
}

const exportedComponent = connect(mapStateToProps)(injectIntl(BotPage))
exportedComponent.serverFetch = fetchABot;

export default exportedComponent;
