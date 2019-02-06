import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import App from '../App';

const LocaleRoutes = () => (
  <Switch>
    <Route path="/:lang(en|fr|de|da|zh-cn)/" component={App} />
    <Route path="/" component={() => (<Redirect to="/en"/>)} />
  </Switch>
);

export default hot(LocaleRoutes);
