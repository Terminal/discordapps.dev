import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from '../App';
import { hot } from 'react-hot-loader/root';

const LocaleRoutes = () => (
  <Switch>
    <Route path="/:lang" component={App} />
    <Route path="/" component={() => (<App locale="en-GB"/>)} />
  </Switch>
);

export default hot(LocaleRoutes);
