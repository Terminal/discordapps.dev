import React from 'react';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/Layout';
import Container from '../components/Container';

export default () => (
  <Layout>
    <Container>
      <FormattedMessage id="site.name" />
    </Container>
  </Layout>
);
