import React from 'react';
import background from './background.jpg';
import './index.scss';

const HalfscreenFullscreen = ({ children, className }) => (
  <section className="fullscreen ls-halfscreen">
    <div className="background" style={{ backgroundImage: `url(${background})` }} />
    <div className="ls-halfscreen-contents">
      <section className={className}>
        {children}
      </section>
    </div>
  </section>
);

export default HalfscreenFullscreen;
