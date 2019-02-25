import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from '../../pages/Home';

class WebsiteRouter extends Component {
  render() {
    return (
      <Router>
        {/* Locale needed cus React Router 4 uses exact path */}
        <Route path="/:locale/" exact component={Home} />
      </Router>
    )
  }
}

export default WebsiteRouter;
