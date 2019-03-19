import React, { Component } from 'react';
import Container from '../components/Container';
import Flex from '../components/FlexColumns';
import Layout from '../components/Layout';
import CategoriesLinksList from '../components/CategoriesLinksList';
import PleaseAddYourBotPleaseThanks from '../components/PleaseAddYourBotPleaseThanks';
import CategoryCollection from '../components/CategoryCollection';
import HelpUsImprove from '../components/HelpUsImprove';
import Welcome from '../components/Welcome';

class Home extends Component {
  render() {
    return (
      <Layout>
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
