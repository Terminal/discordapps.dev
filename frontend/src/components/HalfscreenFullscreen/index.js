import React from 'react';
import { FormattedMessage } from 'react-intl';
import background from './background.jpg';
import './index.scss';

const HalfscreenFullscreen = ({ children, className }) => (
  <section className="fullscreen ls-halfscreen">
    <div className="background" style={{ backgroundImage: `url('${background}')` }} />
    <div className="ls-halfscreen-contents">
      <section className={className}>
        {children}
      </section>
      <noscript className="center-text">
        <p><FormattedMessage id="errors.website.noscript" /></p>
      </noscript>
    </div>
  </section>
);

export default HalfscreenFullscreen;
