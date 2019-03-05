import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Locale from '../../pages/Locale';
import NotFound from '../../pages/NotFound';
import InternationalisationProvider from '../InternationalisationProvider';
import AuthenticateCallback from '../AuthenticateCallback';
import AuthenticateLogout from '../AuthenticateLogout';

class WebsiteRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/auth/callback" exact component={({ location }) => (
          <AuthenticateCallback location={location} />
        )} />
        <Route path="/auth/logout" exact component={({ location }) => (
          <AuthenticateLogout />
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
        <Route path="/:locale" component={({ match, location, staticContext }) => {
          if (staticContext) {
            staticContext.status = 404;
          }

          return (
            <InternationalisationProvider match={match} location={location}>
              <NotFound />
            </InternationalisationProvider>
          )
        }} />
      </Switch>
    )
  }
}

export default WebsiteRouter;
