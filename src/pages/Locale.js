import React from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../components/Container';
import ContentBox from '../components/ContentBox';
import FlagLinks from '../components/FlagLinks';
import Layout from '../components/Layout';
import Modesta from '../data/Modesta';

export default () => (
  <Layout match={this.props.match}>
    <Container>
      <ContentBox className={Modesta.center}>
        <h2><FormattedMessage id="pages.locale.choose" /></h2>
        <FlagLinks />
        <p>
          <a href="https://github.com/Terminal/ls.terminal.ink/tree/master/locales">
            <FormattedMessage id="pages.locale.pleasehelp"></FormattedMessage>
          </a>
        </p>
      </ContentBox>
    </Container>
  </Layout>
);
