import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import Locations from '../../../../data/Locations';
import NotALink from '../../../../components/NotALink';

class AppPageDeleteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sure: false,
      deleted: false
    }

    this.openSure = this.openSure.bind(this);
    this.delete = this.delete.bind(this);
  }
  openSure() {
    this.setState({
      sure: true
    });
  }
  delete() {
    fetch(`${Locations.server}/bots/${this.props.app.id}/delete`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) this.setState({
          deleted: true
        });
      })
  }
  render() {
    if (this.state.deleted) {
      return (
        <Redirect to="/" />
      )
    }

    if (this.state.sure) {
      return <NotALink onClick={this.delete}><FormattedMessage id="pages.bots.reallyDelete" /></NotALink>
    }

    return (
      <NotALink onClick={this.openSure}><FormattedMessage id="pages.bots.delete" /></NotALink>
    )
  }
}


export default AppPageDeleteButton;
