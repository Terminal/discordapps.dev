import React from 'react';
import PropTypes from 'prop-types';

import background from './background.jpg';
import LocalLink from '../LocalLink';
import { FormattedMessage } from 'react-intl';
import './index.scss';

class Intro extends React.Component {
  render() {
    return (
      <section className="fullscreen half intro">
        <div className="background" style={({backgroundImage: `url(${this.props.image || background})`})}>
        </div>
        <div className="center-object">
          <div className="center">
            <FormattedMessage id="intro.language">
              {(language) => (
                <LocalLink className="btn white emoji-button" to="/locale" aria-label={language}>
                  <span className="emoji twa-globe-showing-europe-africa"></span>
                </LocalLink>
              )}
            </FormattedMessage>
            <LocalLink className="btn white black-text emoji-button" to="/edit">
              <FormattedMessage id={`pages.${this.props.type}.add`} />
            </LocalLink>
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
