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

    const store = configureStore();

    // render the app as a string
    const html = ReactDOMServer.renderToString(
      <ReduxProvider store={store}>
        <StaticRouter location={req.baseUrl} context={context}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    );

    res.status(context.status);

    // inject the rendered app into our html and send it
    res.send(
      htmlData
        .replace(
          '<div id="root"></div>',
          `<div id="root">${html}</div>`
        )
        .replace(
          '<!-- State -->',
          `
<script>
  window.REDUX_STATE = ${JSON.stringify(store.getState())}
</script>
          `
        )
        .replace(
          '<!doctype html>',
          `<!doctype html>
<!--
  ls.terminal.ink Version 13
  Copyright (C) 2019 Terminal.ink
  Copyright (C) 2019 7coil

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->`
        )
    );
  });
}
