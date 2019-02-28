import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../components/Container';
import Layout from '../components/Layout';
import ContentBox from '../components/ContentBox';
import PleaseAddYourBotPleaseThanks from '../components/PleaseAddYourBotPleaseThanks';

class NotFound extends Component {
  render() {
    return (
      <Layout>
        <Container>
          <ContentBox>
            <h1>
              <FormattedMessage id="pages.error.notfound" />
            </h1>
            <p>
              <FormattedMessage id="pages.error.snarky" />
            </p>
          </ContentBox>
          <PleaseAddYourBotPleaseThanks />
        </Container>
      </Layout>
    );
  }
}

export default NotFound;
