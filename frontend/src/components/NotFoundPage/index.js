import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PageContainer from '../PageContainer';

class NotFoundPage extends Component {
  render() {
    if (this.props.staticContext) {
      this.props.staticContext.statusCode = 404;
    }

    return (
      <PageContainer>
        <p><FormattedMessage id="pages.notfound.message" /></p>
      </PageContainer>
    );
  }
}

export default NotFoundPage;
