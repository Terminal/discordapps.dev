import React from 'react';
import PropTypes from 'prop-types';

import background from './background.jpg';
import logo from './logo.svg';
import { FormattedMessage } from 'react-intl';
import Link from './../Link'
import './index.scss';

class Intro extends React.Component {
  render() {
    return (
      <section className="fullscreen half intro">
        <div className="background" style={({backgroundImage: `url(${this.props.image || background})`})}>
        </div>
        <div className="center-object">
          <div className="center-items">
            <Link href="/">
              <section className="me unset">
                <img alt="The logo for Discord_Fork" draggable="false" className="image-title" src={logo} style={({width: '7em', height: '7em'})}></img>
                <div>
                  <h1 className="title no-margin white-text">
                    <FormattedMessage id={`pages.${this.props.type}.pagename`} />
                  </h1>
                  <span className="undertitle white-text">
                    <FormattedMessage id={`pages.${this.props.type}.description`} />
                  </span>
                </div>
              </section>
            </Link>
          </div>
          <div className="center">
            <FormattedMessage id="intro.language">
              {(language) => (
                <Link className="btn white emoji-button" to="/locale" aria-label={language}>
                  <span className="emoji twa-globe-showing-europe-africa"></span>
                </Link>
              )}
            </FormattedMessage>
            <Link className="btn white black-text emoji-button" to="/edit">
              <FormattedMessage id={`pages.${this.props.type}.add`} />
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

Intro.propTypes = {
  type: PropTypes.string,
  image: PropTypes.string
};

export default Intro;
