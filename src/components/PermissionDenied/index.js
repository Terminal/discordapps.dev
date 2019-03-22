import React, { Component } from 'react';
import Layout from '../Layout';
import ContentBox from '../ContentBox';
import Container from '../Container';
import { FormattedMessage } from 'react-intl';

class PermissionDenied extends Component {
  render() {
    return (
      <Layout match={this.props.match}>
        <Container>
          <ContentBox>
            <h2><FormattedMessage id="errors.permissions.denied" /></h2>
          </ContentBox>
        </Container>
      </Layout>
    )
  }
}

export default PermissionDenied;
