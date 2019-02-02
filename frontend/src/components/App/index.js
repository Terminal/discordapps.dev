import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppsIfNeeded } from '../../redux/actions';

import Navbar from '../Navbar';

import './index.scss';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAppsIfNeeded());
  }


  render() {
    const { isFetching, apps } = this.props;
    const totalapps = apps.length;

    return (
      <div>
        <Navbar />
        {isFetching && apps.length === 0 && <h2>Loading...</h2>}
        {!isFetching && apps.length === 0 && <h2>Empty.</h2>}
        {JSON.stringify(apps)}
        <p>Hello world!</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isFetching, apps } = state;

  return {
    isFetching,
    apps
  };
};

export default connect(mapStateToProps)(App);
