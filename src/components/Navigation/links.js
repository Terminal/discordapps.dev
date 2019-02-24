import React from 'react';

import LocalLink from '../LocalLink';
import { FormattedMessage } from 'react-intl';

class NavigationLinks extends React.Component {
  render() {
    return (
      <div>
        <LocalLink to="/">
          <FormattedMessage id="pages.bots.shortname" />
        </LocalLink>
      </div>
    );
  }
}

export default NavigationLinks;
