import React, { Component } from 'react';
import Container from '../components/Container';
import Flex from '../components/FlexColumns';
import HelpUsImprove from '../components/HelpUsImprove';
import Layout from '../components/Layout';
import PleaseAddYourBotPleaseThanks from '../components/GetStartedWithBots';
import { fetchCategoriesIfNeeded } from '../redux/actions/categories';
import WebsiteTypeButtons from '../components/WebsiteTypeButtons';

class Home extends Component {
  render() {
    return (
      <Layout match={this.props.match}>
        <Container>
          <Flex padding={true}>
            <Flex columns={3}>
              <WebsiteTypeButtons />
              <HelpUsImprove />
            </Flex>
            <Flex columns={9}>
            </Flex>
          </Flex>
          <PleaseAddYourBotPleaseThanks />
        </Container>
      </Layout>
    );
  }
}

Home.serverFetch = [
  fetchCategoriesIfNeeded
]

export default Home;
