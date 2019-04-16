import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from "react-helmet";
import { Provider as ReduxProvider } from 'react-redux';
import { matchPath, StaticRouter } from 'react-router';
import App from '../../src/App';
import routes from '../../src/data/routes';
import configureStore from '../../src/redux/store';
import { readFileSync } from 'fs';
import { join } from 'path';
import redirects from '../../src/data/redirects';

const htmlData = readFileSync(join(__dirname, '../client/index.html'), 'utf8')

export default (req, res, next) => {
  // If a redirect is required, return the redirect.
  for (let i = 0; i < redirects.length; i += 1) {
    const match = matchPath(req.baseUrl, redirects[i]);
    const route = redirects[i];
    if (match) {
      return res.redirect(route.status || 302, route.to({match}))
    }
  }

  const context = {
    status: 200,
  };

  const store = configureStore();

  // https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4
  // Fetch everything needed to render the page from redux.
  const promises = [];
  
  for (let i = 0; i < routes.length; i += 1) {
    const match = matchPath(req.baseUrl, routes[i]);
    const route = routes[i];
    if (match && route.component.serverFetch) {
      for (let j = 0; j < route.component.serverFetch.length; j += 1) {
        const serverFetch = route.component.serverFetch[j];
        const payload = serverFetch.payload;

        if (serverFetch.pass.includes('match')) {
          payload.match = match;
        }

        if (serverFetch.pass.includes('pathname')) {
          payload.pathname = req.baseUrl;
        }

        promises.push(store.dispatch(serverFetch.function(payload)));
      }
    }
  }
  
  // After redux finishes, then send the HTML
  Promise.all(promises)
    .then(() => {
      // render the app as a string-
      const html = ReactDOMServer.renderToString(
        <ReduxProvider store={store}>
          <StaticRouter location={req.baseUrl} context={context}>
            <App />
          </StaticRouter>
        </ReduxProvider>
      );
      const helmet = Helmet.renderStatic();

      // Set the status code to the status of the components.
      res.status(context.status);

      res.send(
        htmlData
          .replace(
            '<html lang="en">',
            `<html ${helmet.htmlAttributes.toString()}>`
          )
          .replace(
            '<title>Discord Apps Marketplace</title>',
            helmet.title.toString() +
            helmet.meta.toString() +
            helmet.link.toString() + 
            helmet.script.toString()
          )
          .replace(
            '<div id="app"></div>',
            `<div id="app">${html}</div><script>window.REDUX_STATE = ${JSON.stringify(store.getState())}</script>`
          )
      );
    })
    .catch(err => next(err));
}
