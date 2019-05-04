import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import BotCategoriesLinksList from '../../components/BotCategoriesLinksList';
import BotCollection from '../../components/BotCollection';
import Container from '../../components/Container';
import ContentBox from '../../components/ContentBox';
import Flex from '../../components/FlexColumns';
import GetStartedWithBots from '../../components/GetStartedWithBots';
import Layout from '../../components/Layout';
import LoadingContentBox from '../../components/LoadingContentBox';
import WebsiteTypeButtons from '../../components/WebsiteTypeButtons';
import Locations from '../../data/Locations';
import States from '../../data/States';
import calculateBotScore from '../../helpers/calulateBotScore';
import { fetchCategoriesIfNeeded } from '../../redux/actions/categories';

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

    const displayed = [];

    return (
      <Layout match={this.props.match}>
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
