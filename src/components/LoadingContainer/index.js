import React, { Component } from 'react';
import Modesta from '../../data/Modesta';
import ContentBox from '../ContentBox';
import Container from '../Container';

class LoadingContainer extends Component {
  render() {
    return (
      <Container>
        <ContentBox>
          <div class={Modesta.loader}>Loading...</div>
        </ContentBox>
      </Container>
    )
  }
}

export default LoadingContainer;
