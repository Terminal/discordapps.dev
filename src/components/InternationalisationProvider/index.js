import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';

class InternationalisationProvider extends Component {
  render() {
    return (
      <IntlProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={() => (
              <Redirect from="/" exact to="/en-GB" />
            )} />
            <Route path="/:locale" component={() => this.props.children}/>
          </Switch>
        </Router>
      </IntlProvider>
    )
  }
}

export default InternationalisationProvider;
