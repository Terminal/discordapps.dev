import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';

const Routes = () => (
  <Switch>
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
