import React, { Component } from 'react';
import { Modesta, CSSElements } from '../../data/Styles';
import ConstructCSS from '../../helpers/ConstructCSS';
import styles from './index.module.scss';

class TableContainer extends Component {
  render() {
    return (
      <div className={ConstructCSS(Modesta.tableContainer, styles.table, CSSElements.scrollbar)}>
        {this.props.children}
      </div>
    )
  }
}

export default TableContainer;
