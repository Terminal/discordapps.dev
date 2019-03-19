import React, { Component } from 'react';
import Layout from '../Layout';
import ContentBox from '../ContentBox';
import Container from '../Container';

class PleaseLogin extends Component {
  render() {
    return (
      <Layout>
        <Container>
          <ContentBox>
            please login
          </ContentBox>
        </Container>
      </Layout>
    )
  }
}

export default PleaseLogin;
