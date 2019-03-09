import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import Locations from '../../data/Locations';

class WereNotReadyToGoLiveBox extends Component {
  render() {
    return (
      <ContentBox className={`${modesta.alizarin} ${modesta['white-text']}`}>
        <p>
          This community developed edition of the <b>Terminal.ink Bot List and Application Marketplace</b> is not ready for production.<br />
          <a className={`${modesta.btn} ${modesta.asbestos}`} href={Locations.server}>Main website</a><br />
          <a className={`${modesta.btn} ${modesta.asbestos}`} href={Locations.sourceCode}>Development Source Code @ GitHub</a>
        </p>
      </ContentBox>
    )
  }
}

export default WereNotReadyToGoLiveBox;
