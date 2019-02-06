import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import HomePagePage from '../HomePagePage';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path='/:ree/' exact component={HomePagePage} />
        <Route component={NotFoundPage} />
      </Switch>
    )
  }
}

export default Routes;
