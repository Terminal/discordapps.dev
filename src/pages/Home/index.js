import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import BotCategoriesLinksList from '../../components/BotCategoriesLinksList';
import BotCollection from '../../components/BotCollection';
import Container from '../../components/Container';
import ContentBox from '../../components/ContentBox';
import Flex from '../../components/FlexColumns';
import GetStartedWithBots from '../../components/GetStartedWithBots';
import Layout from '../../components/Layout';
import LazyImage from '../../components/LazyImage';
import LoadingContentBox from '../../components/LoadingContentBox';
import LocalisedHyperlink from '../../components/LocalisedHyperlink';
import WebsiteTypeButtons from '../../components/WebsiteTypeButtons';
import Locations from '../../data/Locations';
import States from '../../data/States';
import ConstructCSS from '../../helpers/ConstructCSS';
import { fetchCategoriesIfNeeded } from '../../redux/actions/categories';
import hkImage from './hk.jpg';
import styles from './index.module.scss';
import rpcImage from './rpc.jpg';
import calculateBotScore from '../../helpers/calulateBotScore';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
  }
  componentDidMount() {
    fetch(`${Locations.server}/reactjs/v2/apps/search?approved=${States.APPROVED}`)
      .then(res => res.json())
      .then((data) => {
        if (data.ok) {
          this.setState({
            results: data.data
              .filter(bot => bot.state === 'approved')
              .filter(bot => bot.hide !== true)
              .map(bot => calculateBotScore({
                bot,
                locale: this.props.intl.locale
              }))
              .sort((a, b) => b.random - a.random)
          });
        } else {
          this.setState({
            message: data.message
          });
        }
      });
  }
  render() {
    const results = this.state.results;
    const settings = {
      className: styles.slider,
      dotsClass: styles.dots,
      centerMode: true,
      infinite: false,
      slidesToShow: 1,
      // autoplay: true,
      // autoplaySpeed: 3000,
      speed: 500,
      arrows: false,
      dots: true,
      focusOnSelect: true,
      pauseOnDotsHover: true,
      pauseOnFocus: true,
      pauseOnHover: true,
    };

    const displayed = [];

    return (
      <Layout match={this.props.match}>
        <Container>
          <Slider {...settings}>
            <ContentBox className={ConstructCSS(styles.sliderContainer)}>
              <iframe src="https://www.youtube-nocookie.com/embed/pYRCVFK-mjk?autoplay=1&amp;loop=1&amp;playlist=pYRCVFK-mjk&amp;mute=1" className={styles.sliderVideo} title="Bots YouTube Background" />
              <div className={styles.sliderContents}>
                <h3><FormattedMessage id="pages.home.bots.title" /></h3>
                <p><FormattedMessage id="pages.home.bots.description" /></p>
                <p>
                  <LocalisedHyperlink to="/bots">
                    <small><FormattedMessage id="pages.home.bots.link" /></small>
                  </LocalisedHyperlink>
                </p>
              </div>
            </ContentBox>
            <ContentBox className={styles.sliderContainer}>
              <LazyImage src={rpcImage} className={styles.sliderImage} />
              <div className={styles.sliderContents}>
              <h3><FormattedMessage id="pages.home.rpc.title" /></h3>
                <p><FormattedMessage id="pages.home.rpc.description" /></p>
                <p>
                  <LocalisedHyperlink to="/rpc">
                    <small><FormattedMessage id="pages.home.rpc.link" /></small>
                  </LocalisedHyperlink>
                </p>
              </div>
            </ContentBox>
            <ContentBox className={styles.sliderContainer}>
              <LazyImage src={hkImage} className={styles.sliderImage} />
              <div className={styles.sliderContents}>
              <h3><FormattedMessage id="pages.home.discover.title" /></h3>
                <p><FormattedMessage id="pages.home.discover.description" /></p>
                <p>
                  <LocalisedHyperlink to="/posts">
                    <small><FormattedMessage id="pages.home.discover.link" /></small>
                  </LocalisedHyperlink>
                </p>
              </div>
            </ContentBox>
          </Slider>
          <Flex padding={true}>
            <Flex columns={3}>
              <WebsiteTypeButtons />
              <BotCategoriesLinksList />
            </Flex>
            <Flex columns={9}>
              {
                Array.isArray(results) ?
                <>
                  {/* <ContentBox>
                    <h4><FormattedMessage id="pages.home.topBots" /></h4>
                    <BotCollection bots={
                      results
                        .filter(bot => bot.type === 'bots')
                        .filter(bot => bot.reviewsCount)
                        .filter(bot => !displayed.includes(bot.id))
                        .sort((a, b) => b.random - a.random)
                        .map((bot, index) => {
                          if (index < 9) displayed.push(bot.id)
                          return bot;
                        })
                    } limit={9} />
                  </ContentBox> */}
                  <ContentBox>
                    <h4><FormattedMessage id="pages.home.randomBots" /></h4>
                    <BotCollection bots={
                      results
                        .filter(bot => bot.type === 'bots')
                        .map(bot => Object.assign({}, bot, {random: Math.random()}))
                        .sort((a, b) => b.random - a.random)
                        .map((bot, index) => {
                          if (index < 9) displayed.push(bot.id)
                          return bot;
                        })
                    } limit={9} />
                  </ContentBox>
                  <ContentBox>
                    <h4><FormattedMessage id="pages.home.topRPC" /></h4>
                    <BotCollection bots={
                      results
                        .filter(bot => bot.type === 'rpc')
                        .sort((a, b) => b.random - a.random)
                    } limit={9} />
                  </ContentBox>
                  <ContentBox>
                    <h4><FormattedMessage id="pages.home.popularBots" /></h4>
                    <BotCollection
                      bots={
                        results
                          .filter(bot => bot.type === 'bots')
                          .filter(bot => bot.count)
                          .filter(bot => !displayed.includes(bot.id))
                          .sort((a, b) => b.count - a.count)
                          .map((bot, index) => {
                            if (index < 9) displayed.push(bot.id)
                            return bot;
                          })
                      }
                      limit={9}
                      metric="count" />
                  </ContentBox>
                  <ContentBox>
                    <h4><FormattedMessage id="pages.home.smallBots" /></h4>
                    <BotCollection
                      bots={
                        results
                          .filter(bot => bot.type === 'bots')
                          .filter(bot => bot.count)
                          .filter(bot => !displayed.includes(bot.id))
                          .sort((a, b) => a.count - b.count)
                          .map((bot, index) => {
                            if (index < 9) displayed.push(bot.id)
                            return bot;
                          })
                      }
                      limit={9}
                      metric="count" />
                  </ContentBox>
                  <ContentBox>
                    <h4><FormattedMessage id="pages.home.newestBots" /></h4>
                    <BotCollection bots={
                      results
                        .filter(bot => bot.type === 'bots')
                        .filter(bot => !displayed.includes(bot.id))
                        .sort((a, b) => b.created - a.created)
                        .map((bot, index) => {
                          if (index < 9) displayed.push(bot.id)
                          return bot;
                        })
                    } limit={9} />
                  </ContentBox>
                </> :
                <LoadingContentBox />
              }
            </Flex>
          </Flex>
          <GetStartedWithBots />
        </Container>
      </Layout>
    );
  }
}


const mapStateToProps = (state) => {
  const { bots } = state;
  return { bots };
}

const exportedComponent = connect(mapStateToProps)(injectIntl(Home));

exportedComponent.serverFetch = [
  {
    function: fetchCategoriesIfNeeded,
    pass: [],
    payload: {}
  }
]

export default exportedComponent;
