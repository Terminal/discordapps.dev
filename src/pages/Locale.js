import React from 'react';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/Layout';
import Container from '../components/Container';
import FlagLinks from '../components/FlagLinks';

import modesta from '../ModestaCSS/scss/modesta.module.scss';

export default () => (
  <Layout>
    <Container className={modesta.center}>
      <h2><FormattedMessage id="pages.locale.choose" /></h2>
      <FlagLinks />
      <p>
        <a href="https://github.com/Terminal/ls.terminal.ink/tree/master/locales">
          <FormattedMessage id="pages.locale.pleasehelp"></FormattedMessage>
        </a>
      </p>
    </Container>
  </Layout>
);
