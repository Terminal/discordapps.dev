import React, { forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';
import LocalLink from '../LocalLink';

const NavbarLinks = forwardRef((props, ref) => (
  <div ref={ref} className="sidenav">
    <FormattedMessage id="navbar.languages">
      {message => (
        <LocalLink aria-label={message} to="/locale">
          <span className="emoji twa-globe-showing-europe-africa" />
        </LocalLink>
      )}
    </FormattedMessage>
    <FormattedMessage id="navbar.add">
      {message => (
        <a aria-label={message} href="#">
          {message}
        </a>
      )}
    </FormattedMessage>
    <FormattedMessage id="navbar.user">
      {message => (
        <a aria-label={message} href="#">
          {message}
        </a>
      )}
    </FormattedMessage>
    <FormattedMessage id="navbar.logout">
      {message => (
        <a aria-label={message} href="#">
          {message}
        </a>
      )}
    </FormattedMessage>
    <FormattedMessage id="navbar.login">
      {message => (
        <a aria-label={message} href="#">
          {message}
        </a>
      )}
    </FormattedMessage>
    <FormattedMessage id="navbar.admin">
      {message => (
        <a aria-label={message} href="#">
          {message}
        </a>
      )}
    </FormattedMessage>
  </div>
));

NavbarLinks.displayName = 'NavbarLinks';

export default NavbarLinks;
