import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Locale from '../../pages/Locale';
import NotFound from '../../pages/NotFound';
import AuthenticateLogout from '../../pages/LogOut';
import EditBot from '../../pages/EditBot';
import InternationalisationProvider from '../InternationalisationProvider';
import BotPage from '../../pages/BotPage';
import FilterPage from '../../pages/FilterPage';
import ConfigurePage from '../../pages/ConfigurePage';
import Game from '../../pages/Game';

class WebsiteRouter extends Component {
  render() {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') window.location.href = `http://127.0.0.1:3000${window.location.pathname}`;
    if (typeof window !== 'undefined' && window.location.hostname === 'discordapp.dev') window.location.href = `https://discordapps.dev${window.location.pathname}`;

    return (
      <Switch>
        <Route path="/" exact component={() => (
          <Redirect to="/en-GB" />
        )} />
        <Route path="/:locale/" exact component={({ match, location }) => (
          <InternationalisationProvider match={match} location={location}>
            <Home />
          </InternationalisationProvider>
        )} />
        <Route path="/:locale/game" exact component={({ match, location }) => (
          <InternationalisationProvider match={match} location={location}>
            <Game />
          </InternationalisationProvider>
        )} />
        <Route path="/:locale/auth/logout" exact component={({ match, location }) => (
          <InternationalisationProvider match={match} location={location}>
            <AuthenticateLogout />
          </InternationalisationProvider>
        )} />
        <Route path="/:locale/bots/add" exact component={({ match, location }) => (
          <InternationalisationProvider match={match} location={location}>
            <EditBot match={match} location={location} />
          </InternationalisationProvider>
        )} />
        <Route path="/:locale/bots/filter" exact component={({ match, location }) => (
          <InternationalisationProvider match={match} location={location}>
            <FilterPage match={match} location={location} />
          </InternationalisationProvider>
        )} />
        <Route path="/:locale/bots/:id/configure" exact component={({ match, location }) => (
          <InternationalisationProvider match={match} location={location}>
            <ConfigurePage match={match} location={location} />
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
