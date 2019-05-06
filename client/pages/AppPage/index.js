import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import WebsiteBackgroundImage from '../../components/WebsiteBackgroundImage';
import Button from '../../components/Button';
import Container from '../../components/Container';
import ContentBox from '../../components/ContentBox';
import Flex from '../../components/FlexColumns';
import Layout from '../../components/Layout';
import LoadingContainer from '../../components/LoadingContainer';
import NotALink from '../../components/NotALink';
import Youku from '../../components/Youku';
import YouTube from '../../components/YouTube';
import Locations from '../../data/Locations';
import ConstructCSS from '../../helpers/ConstructCSS';
import reviewToJsonLd from '../../helpers/reviewToJsonLd';
import { Localise } from '../../locales';
import { fetchABot } from '../../redux/actions/bot';
import NotFound from '../NotFound';
import AppPageContentBox from './AppPageContentBox';
import AppPageImagesBox from './AppPageImagesBox';
import AppPageInfoBox from './AppPageInfoBox';
import AppPageReviewsBox from './AppPageReviewsBox';
import AppPageSetStateBox from './AppPageSetStateBox';
import AppPageTitleBox from './AppPageTitleBox';
import styles from './index.module.scss';
import AppPageInviteButton from './AppPageInviteButton';

class BotPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bot: null,
      displayLocale: props.intl.locale,
    };

    this.setLocale = this.setLocale.bind(this);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    // Check if the bot has been injected
    dispatch(fetchABot({match}));
  }

  setLocale(locale) {
    this.setState({
      displayLocale: locale
    })

    window.scrollTo(0, 0);
  }

  render() {
    const app = this.props.bot.data
    const auth = this.props.auth.data
    const status = this.props.bot.status

    if (status === 404) {
      if (this.props.staticContext) this.props.staticContext.status = 404;
      return (
        <NotFound match={this.props.match}/>
      );
    }
    
    if (!app) {
      return (
        <Layout match={this.props.match}>
          <LoadingContainer />
        </Layout>
      );
    }

    if (app.id === this.props.match.params.id && app.type !== this.props.match.params.type) {
      if (this.props.staticContext) this.props.staticContext.status = 301;
      return (
        <Redirect to={`/${this.props.match.params.locale}/${app.type}/${app.id}`} />
      )
    }

    const contents = Localise(app.contents, this.state.displayLocale || this.props.intl.locale);

    const reviewJSON = reviewToJsonLd(contents, app);

    return (
      <Layout match={this.props.match} afterNav={<AppPageTitleBox bot={app} contents={contents}/>}>
        <Helmet>
          <title>{contents.name}</title>
          <meta property="og:title" content={contents.name}/>
          <meta property="og:description" content={contents.description}/>
          <meta name="description" content={contents.description}/>
          <meta property="og:image" content={`${Locations.cdn}${app.cachedImages.avatar}`} />
          <meta httpEquiv="last-modified" content={(new Date(app.edited)).toISOString().split('T')[0]} />
          {
            reviewJSON &&
              <script type="application/ld+json">
                {reviewJSON}
              </script>
          }
        </Helmet>
        { 
          app.cachedImages.cover ?
          <WebsiteBackgroundImage src={`${Locations.cdn}${app.cachedImages.cover}`}/> :
          null
        }
        <Container className={styles.topPad}>
          <Flex padding={true}>
            <Flex columns={3}>
              <AppPageInviteButton app={app} />
              <AppPageInfoBox app={app} />
              <ContentBox>
                <p>
                  {
                    app.contents.length === 1 ?
                    <FormattedMessage id="pages.apps.oneLang" /> :
                    <FormattedMessage id="pages.apps.otherLang" />
                  }
                  <ul className={ConstructCSS(styles.appLinks, styles.localeLinks)}>
                    {
                      app.contents
                        .map(appContents =>
                          <li key={appContents.locale}>
                            {
                              contents.locale === appContents.locale ?
                              <span className={styles.used}>
                                <FormattedMessage id={`locales.${appContents.locale}`} />
                              </span> :
                              <NotALink onClick={() => this.setLocale(appContents.locale)}>
                                <FormattedMessage id={`locales.${appContents.locale}`} />
                              </NotALink>
                            }
                          </li>
                        )
                    }
                  </ul>
                </p>
              </ContentBox>
            </Flex>
            <Flex columns={9}>
              <AppPageContentBox page={contents.page}/>
              <AppPageImagesBox images={app.cachedImages.preview}>
                {app.videos.youtube ? <YouTube video={app.videos.youtube} /> : null}
                {app.videos.youku ? <Youku video={app.videos.youku} /> : null}
              </AppPageImagesBox>
              <AppPageReviewsBox app={app} />
            </Flex>
          </Flex>
          <AppPageSetStateBox app={app} />
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { bot, auth } = state;
  return { bot, auth };
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
