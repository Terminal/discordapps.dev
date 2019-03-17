import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Locale from '../../pages/Locale';
import NotFound from '../../pages/NotFound';
import AuthenticateLogout from '../../pages/LogOut';
import EditBot from '../../pages/EditBot';
import InternationalisationProvider from '../InternationalisationProvider';
import BotPage from '../../pages/BotPage';

class WebsiteRouter extends Component {
  render() {
    return (
      <Switch>
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
        <Route path="/:locale/bots/add" exact component={({ match, location }) => (
          <InternationalisationProvider match={match} location={location}>
            <EditBot match={match} location={location} />
          </InternationalisationProvider>
        )} />
        <Route path="/:locale/bots/:id/edit" exact component={({ match, location }) => (
          <InternationalisationProvider match={match} location={location}>
            <EditBot match={match} location={location} />
          </InternationalisationProvider>
        )} />
        <Route path="/:locale/bots/:id" exact component={({ match, location }) => (
          <InternationalisationProvider match={match} location={location}>
            <BotPage match={match} location={location} />
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
