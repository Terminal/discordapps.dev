import React from 'react';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/Layout';
import Container from '../components/Container';
import FlagLinks from '../components/FlagLinks';

import modesta from '../ModestaCSS/scss/modesta.module.scss';


export default () => (
  <Layout>
    <Container className={modesta.center}>
      <FormattedMessage id="pages.locale.choose" />
      <FlagLinks />
    </Container>
  </Layout>
);
