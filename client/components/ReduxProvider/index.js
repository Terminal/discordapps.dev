import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../redux/store';

class ReduxProvider extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        {this.props.children}
      </Provider>
    )
  }
}

export default ReduxProvider;
