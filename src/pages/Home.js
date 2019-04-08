import React, { Component } from 'react';
import Layout from '../components/Layout';

import { fetchCategoriesIfNeeded } from '../redux/actions/categories';

class Home extends Component {
  render() {
    return (
      <Layout match={this.props.match}>
        
      </Layout>
    );
  }
}

Home.serverFetch = [
  fetchCategoriesIfNeeded
]

export default Home;
