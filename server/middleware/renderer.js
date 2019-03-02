import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { Provider as ReduxProvider } from 'react-redux'
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import configureStore from '../../src/redux/store';

// import our main App component
import App from '../../src/App';

const path = require("path");
const fs = require("fs");

export default (req, res, next) => {
  // point to the html file created by CRA's build tool
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      next(err);
    }

    const context = {
      status: 200,
    };

    // render the app as a string
    const html = ReactDOMServer.renderToString(
      <ReduxProvider store={configureStore()}>
        <Helmet>
          <meta charSet="utf-8" />
        </Helmet>
        <StaticRouter location={req.baseUrl} context={context}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    );

    res.status(context.status);

    // inject the rendered app into our html and send it
    res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )
    );
  });
}
