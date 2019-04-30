import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import BotPageContentBox from '../../components/BotPageContentBox';
import BotPageImagesBox from '../../components/BotPageImagesBox';
import BotPageInfoBox from '../../components/BotPageInfoBox';
import BotPageReviewsBox from '../../components/BotPageReviewsBox';
import BotPageSetStateBox from '../../components/BotPageSetStateBox';
import BtecParallax from '../../components/BtecParallax';
import Container from '../../components/Container';
import ContentBox from '../../components/ContentBox';
import Flex from '../../components/FlexColumns';
import Layout from '../../components/Layout';
import LoadingContainer from '../../components/LoadingContainer';
import LocalisedHyperlink from '../../components/LocalisedHyperlink';
import NotALink from '../../components/NotALink';
import Youku from '../../components/Youku';
import YouTube from '../../components/YouTube';
import Locations from '../../data/Locations';
import States from '../../data/States';
import reviewToJsonLd from '../../helpers/reviewToJsonLd';
import languages, { Localise, languageHasTranslations } from '../../locales';
import { fetchABot } from '../../redux/actions/bot';
import NotFound from '../NotFound';
import styles from './index.module.scss';
import DateFormat from '../../data/DateFormat';
import Modesta from '../../data/Modesta';
import Button from '../../components/Button';
import ConstructCSS from '../../helpers/ConstructCSS';
import AppPageDeleteButton from '../../components/AppPageDeleteButton';

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
          {
            reviewJSON &&
              <script type="application/ld+json">
                {reviewJSON}
              </script>
          }
        </Helmet>
        { 
          app.cachedImages.cover ?
          <BtecParallax src={`${Locations.cdn}${app.cachedImages.cover}`}/> :
          null
        }
        <Container>
          <BotPageInfoBox bot={app} contents={contents}/>
          <Flex padding={true}>
            <Flex columns={3}>
              <a href={app.invite}>
                <Button className={styles.btn}>
                  <FormattedMessage id={`pages.${app.type}.invite`} />
                </Button>
              </a>
              <ContentBox>
                {
                  app.trigger &&
                  <p>
                    <FormattedMessage id="pages.bots.prefix" values={{
                      count: app.trigger.prefix.length
                    }} />
                    <ul className={styles.prefixList}>
                      {app.trigger.prefix.map((prefix, index) => <li key={index} className={styles.prefix}>{prefix}</li>)}
                      {app.trigger.customisable ? <li className={styles.triggerNote}><FormattedMessage id="pages.bots.customisable" /></li> : null}
                      {app.trigger.mentionable ? <li className={styles.triggerNote}><FormattedMessage id="pages.bots.mentionable" /></li> : null}
                    </ul>
                  </p>
                }
                <p>
                  <FormattedMessage id={`pages.apps.appLinks`} />
                  <ul className={styles.appLinks}>
                    {app.support ? <li><a href={app.support}><FormattedMessage id="pages.bots.support" /></a></li> : null}
                    {app.website ? <li><a href={app.website}><FormattedMessage id="pages.bots.website" /></a></li> : null}
                    {app.github && app.github.owner && app.github.repo ? <li><a href={`https://github.com/${app.github.owner}/${app.github.repo}`}><FormattedMessage id="pages.bots.github" /></a></li> : null}
                  </ul>
                </p>
                { auth && (auth.admin || app.authors.some(author => author.id === auth.id)) ?
                  <p>
                    <FormattedMessage id={`pages.apps.devLinks`} />
                    <ul className={styles.appLinks}>
                      <li><LocalisedHyperlink to={`/${app.type}/${app.id}/edit`}><FormattedMessage id={`pages.${app.type}.edit`} /></LocalisedHyperlink></li>
                      <li>
                        <AppPageDeleteButton app={app} />
                      </li>
                      <li><LocalisedHyperlink to={`/${app.type}/${app.id}/configure`}><FormattedMessage id="pages.bots.configure" /></LocalisedHyperlink></li>
                    </ul>
                  </p>
                  : null
                }
                <p>
                  <FormattedMessage id="pages.bots.offeredby"/>
                  <ul className={styles.appLinks}>
                    {app.authors.map((author) => (
                      <li key={author.id}>
                        <LocalisedHyperlink aria-label={`${author.username}#${author.discriminator}`} to="/filter" query={{
                          owners: [author.id],
                          state: States.APPROVED
                        }}>
                          {author.username}#{author.discriminator}
                        </LocalisedHyperlink>
                      </li>
                    ))}
                  </ul>
                </p>
                {
                  app.category &&
                  <p>
                    <FormattedMessage id="pages.bots.category"/>
                    <ul className={styles.appLinks}>
                      <li>
                        <LocalisedHyperlink to="/filter" query={{
                          category: app.category,
                          state: States.APPROVED
                        }}>
                          <FormattedMessage id={`categories.${app.category}`} />
                        </LocalisedHyperlink>
                      </li>
                    </ul>
                  </p>
                }
                {
                  app.count &&
                  <p>
                    <FormattedMessage id="pages.bots.count" values={{
                      guilds: app.count
                    }}/>
                  </p>
                }
                <p>
                  <FormattedMessage id="pages.bots.created" />
                  <ul className={styles.appLinks}>
                    <li>{(new Date(app.created)).toLocaleDateString(this.props.intl.locale, DateFormat)}</li>
                  </ul>
                </p>
                <p>
                  <FormattedMessage id="pages.bots.modified" />
                  <ul className={styles.appLinks}>
                    <li>{(new Date(app.edited)).toLocaleDateString(this.props.intl.locale, DateFormat)}</li>
                  </ul>
                </p>
              </ContentBox>
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
              <BotPageContentBox page={contents.page}/>
              <BotPageImagesBox images={app.cachedImages.preview}>
                {app.videos.youtube ? <YouTube video={app.videos.youtube} /> : null}
                {app.videos.youku ? <Youku video={app.videos.youku} /> : null}
              </BotPageImagesBox>
              <BotPageReviewsBox bot={app} />
            </Flex>
          </Flex>
          <BotPageSetStateBox bot={app} />
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
