import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Locale from '../../pages/Locale';
import NotFound from '../../pages/NotFound';
import InternationalisationProvider from './InternationalisationProvider';
import AuthenticateRedirect from '../AuthenticateRedirect';
import AuthenticateCallback from '../AuthenticateCallback';

class WebsiteRouter extends Component {
  render() {
    return (
      <Router>
        {/* Locale needed cus React Router 4 uses exact path */}
        <Switch>
          <Route path="/auth" exact component={() => (
            <AuthenticateRedirect />
          )} />
          <Route path="/auth/callback" exact component={() => (
            <AuthenticateCallback />
          )} />
          <Route path="/" exact component={() => (
            <Redirect to="/en-GB" />
          )} />
          <Route path="/:locale/" exact component={({ match, location }) => (
            <InternationalisationProvider match={match} location={location}>
              <Home />
            </InternationalisationProvider>
          )} />
          <Route path="/:locale/locale" exact component={({ match, location }) => (
            <InternationalisationProvider match={match} location={location}>
              <Locale />
            </InternationalisationProvider>
          )} />
          <Route path="/:locale" component={({ match, location }) => (
            <InternationalisationProvider match={match} location={location}>
              <NotFound />
            </InternationalisationProvider>
          )} />
        </Switch>
      </Router>
    )
  }
}

export default WebsiteRouter;
