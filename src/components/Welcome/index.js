import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../Container';
import Modesta from '../../data/Modesta';

// import robot from './robot.png';

class Welcome extends Component {
  render() {
    return (
      <Container>
        <h1>
          <FormattedMessage id="site.name" />
        </h1>
        {/* <img src={robot} /> */}
      </Container>
    )
  }
}

export default Welcome;
