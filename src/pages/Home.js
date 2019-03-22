import React, { Component } from 'react';
import CategoriesLinksList from '../components/CategoriesLinksList';
import CategoryCollection from '../components/CategoryCollection';
import Container from '../components/Container';
import Flex from '../components/FlexColumns';
import HelpUsImprove from '../components/HelpUsImprove';
import Layout from '../components/Layout';
import PleaseAddYourBotPleaseThanks from '../components/PleaseAddYourBotPleaseThanks';
import Welcome from '../components/Welcome';

class Home extends Component {
  render() {
    return (
      <Layout match={this.props.match}>
        <Welcome />
        <Container>
          <Flex padding={true}>
            <Flex columns={3}>
              <CategoriesLinksList />
              <HelpUsImprove />
            </Flex>
            <Flex columns={9}>
              <CategoryCollection />
            </Flex>
          </Flex>
          <PleaseAddYourBotPleaseThanks />
        </Container>
      </Layout>
    );
  }
}

export default Home;
