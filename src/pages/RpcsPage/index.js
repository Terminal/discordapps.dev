import React, { Component } from 'react';
import Container from '../../components/Container';
import Flex from '../../components/FlexColumns';
import HelpUsImprove from '../../components/HelpUsImprove';
import Layout from '../../components/Layout';
import PleaseAddYourBotPleaseThanks from '../../components/GetStartedWithBots';
import WebsiteTypeButtons from '../../components/WebsiteTypeButtons';
import Locations from '../../data/Locations';
import ContentBox from '../../components/ContentBox';
import BotCollection from '../../components/BotCollection';
import States from '../../data/States';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

class RpcsPage extends Component {
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
          });
        } else {
          this.setState({
            message: data.message
          });
        }
      });
  }
  render() {
    const { results } = this.state;
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
              <HelpUsImprove />
            </Flex>
            <Flex columns={9}>
              {
                Array.isArray(results) ?
                <ContentBox>
                  <BotCollection bots={
                    results
                      .sort((a, b) => {
                        if (this.state.state === States.APPROVED) return b.random - a.random;
                        return b.edited - a.edited;
                      })
                  } />
                </ContentBox> :
                null
              }
            </Flex>
          </Flex>
          <PleaseAddYourBotPleaseThanks />
        </Container>
      </Layout>
    );
  }
}

export default RpcsPage;
