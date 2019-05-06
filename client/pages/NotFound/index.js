import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../../components/Container';
import ContentBox from '../../components/ContentBox';
import Layout from '../../components/Layout';
import PleaseAddYourBotPleaseThanks from '../../components/GetStartedWithBots';
import Flex from '../../components/FlexColumns';
import WebsiteTypeButtons from '../../components/WebsiteTypeButtons';
import HelpUsImprove from '../../components/HelpUsImprove';

import pensive from './pensive.svg';
import styles from './index.module.scss';

class NotFound extends Component {
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
              <ContentBox>
                <h1>
                  <FormattedMessage id="pages.error.notfound" />
                </h1>
                <p>
                  <FormattedMessage id="pages.error.snarky" />
                </p>
                <img src={pensive} className={styles.pensive} />
              </ContentBox>
            </Flex>
          </Flex>
          <PleaseAddYourBotPleaseThanks />
        </Container>
      </Layout>
    );
  }
}

export default NotFound;
