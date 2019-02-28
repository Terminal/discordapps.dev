import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../components/Container';
import ContentBox from '../components/ContentBox';
import Flex from '../components/FlexColumns';
import Layout from '../components/Layout';
import CategoriesLinksList from '../components/CategoriesLinksList';
import LocalisedHyperlink from '../components/LocalisedHyperlink';

class Home extends Component {
  render() {
    return (
      <Layout>
        <Container>
          <h1>
            <FormattedMessage id="site.name" />
          </h1>
          <h2>
            <FormattedMessage id="site.subheading" />
          </h2>
        </Container>
        <Container>
          <Flex backwardsMobile="yesnt">
            <Flex columns="3">
              <CategoriesLinksList />
            </Flex>
            <Flex columns="9">
              <ContentBox>
                
              </ContentBox>
              <ContentBox>
                Hi
              </ContentBox>
            </Flex>
          </Flex>
          <ContentBox>
            <Flex>
              <Flex columns="4">
                <h4>Get started with Discord Bots</h4>
              </Flex>
              <Flex columns="4">
                <h5>
                  <a href="https://github.com/Terminal/ls.terminal.ink/wiki">
                    Start Innovating
                  </a>
                </h5>
                Learn to create your own Discord bot for your own personal server.
              </Flex>
              <Flex columns="4">
                <h5>
                  <LocalisedHyperlink to="/add">
                    Add your bot
                  </LocalisedHyperlink>
                </h5>
                Share your creation to the world:
                Let others enhance their server experience with your bot.
              </Flex>
            </Flex>
          </ContentBox>
        </Container>
      </Layout>
    );
  }
}

export default Home;
