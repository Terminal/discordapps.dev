import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BotPageContentBox from '../../components/BotPageContentBox';
import BotPageImagesBox from '../../components/BotPageImagesBox';
import BotPageInfoBox from '../../components/BotPageInfoBox';
import BotPageLinks from '../../components/BotPageLinks';
import BotPageReviewsBox from '../../components/BotPageReviewsBox';
import BotPageSetStateBox from '../../components/BotPageSetStateBox';
import BtecParallax from '../../components/BtecParallax';
import Container from '../../components/Container';
import Layout from '../../components/Layout';
import LoadingContainer from '../../components/LoadingContainer';
import Youku from '../../components/Youku';
import YouTube from '../../components/YouTube';
import Locations from '../../data/Locations';
import reviewToJsonLd from '../../helpers/reviewToJsonLd';
import { Localise } from '../../locales';
import { fetchABot } from '../../redux/actions/bot';
import NotFound from '../NotFound';

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
        <NotFound match={this.props.match}/>
      );
    }
    
    if (!bot) {
      return (
        <Layout match={this.props.match}>
          <LoadingContainer />
        </Layout>
      );
    }

    if (bot.id === this.props.match.params.id && bot.type !== this.props.match.params.type) {
      if (this.props.staticContext) this.props.staticContext.status = 301;
      return (
        <Redirect to={`/${this.props.match.params.locale}/${bot.type}/${bot.id}`} />
      )
    }

    const contents = Localise(bot.contents, this.props.intl.locale);

    const reviewJSON = reviewToJsonLd(contents, bot);

    return (
      <Layout match={this.props.match}>
        <Helmet>
          <title>{contents.name}</title>
          <meta property="og:title" content={contents.name}/>
          <meta property="og:description" content={contents.description}/>
          <meta name="description" content={contents.description}/>
          <meta property="og:image" content={`${Locations.cdn}${bot.cachedImages.avatar}`} />
          <meta httpEquiv="last-modified" content={(new Date(bot.edited)).toISOString().split('T')[0]} />
          {
            reviewJSON &&
              <script type="application/ld+json">
                {reviewJSON}
              </script>
          }
        </Helmet>
        { 
          bot.cachedImages.cover ?
          <BtecParallax src={`${Locations.cdn}${bot.cachedImages.cover}`}/> :
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
          <BotPageLinks bot={bot} contents={contents} match={this.props.match} />
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
exportedComponent.serverFetch = [
  {
    function: fetchABot,
    pass: ['match'],
    payload: {}
  }
];

export default exportedComponent;
