import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../data/routes';
import InternationalisationProvider from '../InternationalisationProvider';
import redirects from '../../data/redirects';

class WebsiteRouter extends Component {
  render() {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') window.location.href = `http://127.0.0.1:3000${window.location.pathname}`;
    if (typeof window !== 'undefined' && window.location.hostname === 'discordapp.dev') window.location.href = `https://discordapps.dev${window.location.pathname}`;

    return (
      <Switch>
        {
          redirects.map(route => (
            <Route key={route.path} path={route.path} exact={route.exact} component={({match, location, staticContext}) => {
              if (staticContext) {
                staticContext.status = route.status;
              }
              
              return (
                <Redirect to={route.to({match, location, staticContext})} />
              );
            }} />
          ))
        }
        {
          routes.map(route => {
            const RouteComponent = route.component;
            return (
              <Route key={route.path} path={route.path} exact={route.exact} component={({ match, location, staticContext }) => {
                if (staticContext) {
                  staticContext.status = route.status;
                }

                return (
                  <InternationalisationProvider match={match} location={location}>
                    <RouteComponent match={match} location={location} staticContext={staticContext} />
                  </InternationalisationProvider>
                );
              }} />
            )
          })
        }
      </Switch>
    )
  }
}

export default WebsiteRouter;
