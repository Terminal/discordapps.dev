import React, { Component } from 'react';
import { Modesta } from '../../data/Styles';
import ConstructCSS from '../../helpers/ConstructCSS';

class Container extends Component {
  render() {
    return (
      <div className={ConstructCSS(Modesta.container, this.props.className)}>
        {this.props.children}
      </div>
    )
  }
}

export default Container;
