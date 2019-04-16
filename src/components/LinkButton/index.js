import React, { Component } from 'react';
import LocalisedHyperlink from '../LocalisedHyperlink';
import Button from '../Button';

class LinkButton extends Component {
  render() {
    return (
      <LocalisedHyperlink to={this.props.to}>
        <Button className={this.props.className}>{this.props.children}</Button>
      </LocalisedHyperlink>
    )
  }
}


export default LinkButton;
