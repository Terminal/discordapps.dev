import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';

class WereNotReadyToGoLiveBox extends Component {
  render() {
    return (
      <ContentBox className={`${modesta.alizarin} ${modesta['white-text']}`}>
        <p>
          This community developed edition of the Terminal.ink bot list is not ready for production.<br />
          <a className={`${modesta.btn} ${modesta.asbestos}`} href="https://ls.terminal.ink/">Main website</a><br />
          <a className={`${modesta.btn} ${modesta.asbestos}`} href="https://github.com/Terminal/ls.terminal.ink/tree/ls13">Development Source Code @ GitHub</a>
        </p>
      </ContentBox>
    )
  }
}

export default WereNotReadyToGoLiveBox;
