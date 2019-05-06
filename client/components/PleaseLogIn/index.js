import React, { Component } from 'react';
import Layout from '../Layout';
import ContentBox from '../ContentBox';
import Container from '../Container';
import { FormattedMessage } from 'react-intl';

class PleaseLoginContainer extends Component {
  render() {
    return (
      <Container>
        <ContentBox>
          <h2><FormattedMessage id="errors.permissions.login" /></h2>
        </ContentBox>
      </Container>
    )
  }
}

export default PleaseLoginContainer;
