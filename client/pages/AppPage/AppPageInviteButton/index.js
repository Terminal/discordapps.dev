

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '../../../components/Button';
import styles from './index.module.scss';
import ConstructCSS from '../../../helpers/ConstructCSS';

class AppPageInviteButton extends Component {
  render() {
    const { app } = this.props;
    return (
      <a href={app.invite}>
        <Button className={ConstructCSS(styles.btn, this.props.className)}>
          <FormattedMessage id={`pages.${app.type}.invite`} />
        </Button>
      </a>
    )
  }
}


export default AppPageInviteButton;
