import React from 'react';
import PropTypes from 'prop-types';

import Intro from '../Intro';
import Footer from '../Footer';

class SiteLayout extends React.Component {
  render() {
    return (
      <div className="site-layout">
        <Intro type={this.props.type} image={this.props.image} />
        <div className="main-content-container container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

SiteLayout.propTypes = {
  children: PropTypes.any,
  locale: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string
};

export default SiteLayout;
