import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import { FormattedMessage } from 'react-intl';
import Locations from '../../data/Locations';

class HelpUsImprove extends Component {
  render() {
    return (
      <ContentBox>
        <h4><FormattedMessage id="components.helpusimprove.title" /></h4>
        <p><FormattedMessage id="components.helpusimprove.text" /></p>
        <a href={Locations.sourceIssues}><FormattedMessage id="components.helpusimprove.issues" /></a>
      </ContentBox>
    )
  }
}

export default HelpUsImprove;
