import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import BotCollection from '../../components/BotCollection';
import Container from '../../components/Container';
import ContentBox from '../../components/ContentBox';
import Flex from '../../components/FlexColumns';
import PleaseAddYourBotPleaseThanks from '../../components/GetStartedWithBots';
import Layout from '../../components/Layout';
import LoadingContentBox from '../../components/LoadingContentBox';
import WebsiteTypeButtons from '../../components/WebsiteTypeButtons';
import Locations from '../../data/Locations';
import States from '../../data/States';
import calculateBotScore from '../../helpers/calulateBotScore';

class RpcHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
  }
  componentDidMount() {
    fetch(`${Locations.server}/reactjs/v2/apps/search?type=rpc&approved=${States.APPROVED}`)
      .then(res => res.json())
      .then((data) => {
        if (data.ok) {
          this.setState({
            results: data.data
              .filter(bot => bot.state === 'approved')
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
    return (
      <Layout match={this.props.match}>
        <FormattedMessage id="pages.rpc.index.title">
          {
            title =>
            <FormattedMessage id="pages.rpc.index.description">
              {description =>
                <Helmet>
                  <title>{title}</title>
                  <meta property="og:title" content={title}/>
                  <meta property="og:description" content={description}/>
                  <meta name="description" content={description}/>
                </Helmet>
              }
          </FormattedMessage>
          }
        </FormattedMessage>
        <Container>
          <Flex padding={true}>
            <Flex columns={3}>
              <WebsiteTypeButtons />
            </Flex>
            <Flex columns={9}>
              {
                Array.isArray(results) ?
                <ContentBox>
                  <BotCollection bots={
                    results
                  } />
                </ContentBox> :
                <LoadingContentBox />
              }
            </Flex>
          </Flex>
          <PleaseAddYourBotPleaseThanks />
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { bots } = state;
  return { bots };
}

const exportedComponent = connect(mapStateToProps)(RpcHome);

exportedComponent.serverFetch = []

export default exportedComponent;
