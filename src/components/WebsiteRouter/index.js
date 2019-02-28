import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Locale from '../../pages/Locale';
import NotFound from '../../pages/NotFound';
import InternationalisationProvider from './InternationalisationProvider';

class WebsiteRouter extends Component {
  render() {
    return (
      <Router>
        {/* Locale needed cus React Router 4 uses exact path */}
        <Switch>
          <Route path="/" exact component={() => (
            <Redirect from="/" exact to="/en-GB" />
          )} />
          <Route path="/:locale/" exact component={({ match }) => (
            <InternationalisationProvider match={match}>
              <Home />
            </InternationalisationProvider>
          )} />
          <Route path="/:locale/locale" exact component={({ match }) => (
            <InternationalisationProvider match={match}>
              <Locale />
            </InternationalisationProvider>
          )} />
          <Route path="/:locale" component={({ match }) => (
            <InternationalisationProvider match={match}>
              <NotFound />
            </InternationalisationProvider>
          )} />
        </Switch>
      </Router>
    )
  }
}

export default WebsiteRouter;
