import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../components/Container';
import ContentBox from '../components/ContentBox';
import Flex from '../components/FlexColumns';
import Layout from '../components/Layout';
import CategoriesLinksList from '../components/CategoriesLinksList';

class Home extends Component {
  render() {
    return (
      <Layout>
        <Container>
          <ContentBox>
            <FormattedMessage id="site.name" />
          </ContentBox>
          <Flex backwardsMobile="yesnt">
            <Flex columns="3">
              <CategoriesLinksList />
            </Flex>
            <Flex columns="9">
              <ContentBox>
                Hi
              </ContentBox>
            </Flex>
          </Flex>
        </Container>
      </Layout>
    );
  }
}

export default Home;
