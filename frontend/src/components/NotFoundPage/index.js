import React, { Component } from 'react';
import PageContainer from '../PageContainer';

class NotFoundPage extends Component {
  render() {
    if (this.props.staticContext) {
      this.props.staticContext.statusCode = 404;
    }

    return (
      <PageContainer>
        <p>Not found!</p>
      </PageContainer>
    );
  }
}

export default NotFoundPage;
