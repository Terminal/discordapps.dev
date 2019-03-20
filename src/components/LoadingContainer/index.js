import React, { Component } from 'react';
import Modesta from '../../data/Modesta';
import ContentBox from '../ContentBox';
import Container from '../Container';
import LoadingContentBox from '../LoadingContentBox';

class LoadingContainer extends Component {
  render() {
    return (
      <Container>
        <LoadingContentBox />
      </Container>
    )
  }
}

export default LoadingContainer;
