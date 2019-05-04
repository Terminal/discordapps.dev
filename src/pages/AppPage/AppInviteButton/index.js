import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '../../../components/Button';

class AppInviteButton extends Component {
  render() {
    const { app } = this.props;
    return (
      <a href={app.invite}>
        <Button>
          <FormattedMessage id={`pages.${app.type}.invite`} />
        </Button>
      </a>
    )
  }
}

export default AppInviteButton;
