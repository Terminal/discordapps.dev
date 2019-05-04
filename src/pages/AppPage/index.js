import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Container from '../../components/Container';
import Layout from '../../components/Layout';
import LoadingContainer from '../../components/LoadingContainer';
import Locations from '../../data/Locations';
import reviewToJsonLd from '../../helpers/reviewToJsonLd';
import { Localise } from '../../locales';
import { fetchABot } from '../../redux/actions/bot';
import NotFound from '../NotFound';
import AppDescriptionCard from './AppDescriptionCard';
import AppInviteButton from './AppInviteButton';
import AppLinksCard from './AppLinksCard';
import AppReviewsBox from './AppReviewsBox';
import AppSetStateBox from './AppSetStateBox';
import AppSwitchLocalesCard from './AppSwitchLocalesCard';
import AppContentBox from './AppContentBox';


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
      <Layout match={this.props.match}>
        <Helmet>
          <title>{contents.name}</title>
          <meta property="og:title" content={contents.name}/>
          <meta property="og:description" content={contents.description}/>
          <meta name="description" content={contents.description}/>
          <meta property="og:image" content={`${Locations.cdn}${app.cachedImages.avatar}`} />
          <meta httpEquiv="last-modified" content={(new Date(app.edited)).toISOString().split('T')[0]} />
          <style>
            {`body {
              background-image: url(${Locations.cdn}${app.cachedImages.cover});
            }`}
          </style>
          {
            reviewJSON &&
              <script type="application/ld+json">
                {reviewJSON}
              </script>
          }
        </Helmet>
        <Container>
          <AppDescriptionCard app={app} contents={contents} />
          <AppInviteButton app={app} />
          <AppLinksCard app={app} contents={contents} />
          <AppSwitchLocalesCard app={app} contents={contents} setLocale={this.setLocale} />
          <AppContentBox page={contents.page}/>
          <AppReviewsBox bot={app} />
          <AppSetStateBox bot={app} />
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
