import React, { Component } from 'react';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import styles from './index.module.scss';

class Container extends Component {
  render() {
    return (
      <div className={`${styles.containerContainer} ${modesta.container}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Container;
