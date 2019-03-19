import React, { Component } from 'react';
import Container from '../components/Container';
import Flex from '../components/FlexColumns';
import Layout from '../components/Layout';
import CategoriesLinksList from '../components/CategoriesLinksList';
import PleaseAddYourBotPleaseThanks from '../components/PleaseAddYourBotPleaseThanks';
import CategoryCollection from '../components/CategoryCollection';
import HelpUsImprove from '../components/HelpUsImprove';
import Welcome from '../components/Welcome';
import LocalisedHyperlink from '../components/LocalisedHyperlink';
import { FormattedMessage } from 'react-intl';
import ContentBox from '../components/ContentBox';

class Home extends Component {
  render() {
    return (
      <Layout>
        <Welcome />
        <Container>
          <Flex padding={true}>
            <Flex columns={3}>
              <ContentBox>
                <LocalisedHyperlink to="/bots/filter">
                  <FormattedMessage id="pages.bots.search" />
                </LocalisedHyperlink>
              </ContentBox>
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
