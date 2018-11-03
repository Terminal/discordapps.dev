import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation';
import Footer from '../Footer';

import './index.scss';

class DocsLayout extends React.Component {
  render() {
    return (
      <div className="docs-layout">
        <Navigation />
        <div className="main-content-container container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

DocsLayout.propTypes = {
  children: PropTypes.any,
  locale: PropTypes.string
};

export default DocsLayout;
