import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import HomePagePage from '../HomePagePage';

const Routes = () => (
  <Switch>
    <Route path="/" component={HomePagePage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
