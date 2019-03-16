import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import Locations from '../../data/Locations';
import Modesta from '../../data/Modesta';

class WereNotReadyToGoLiveBox extends Component {
  render() {
    return (
      <ContentBox className={`${Modesta.alizarin} ${Modesta.whiteText}`}>
        <p>
          This community developed edition of the <b>Terminal.ink Bot List and Application Marketplace</b> is not ready for production.<br />
          <a className={`${Modesta.btn} ${Modesta.asbestos}`} href={Locations.server}>Main website</a><br />
          <a className={`${Modesta.btn} ${Modesta.asbestos}`} href={Locations.sourceCode}>Development Source Code @ GitHub</a>
        </p>
      </ContentBox>
    )
  }
}

export default WereNotReadyToGoLiveBox;
