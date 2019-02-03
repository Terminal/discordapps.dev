import React, { forwardRef } from 'react';

const NavbarLinks = forwardRef((props, ref) => (
  <div ref={ref} className="sidenav">
    <a href="#" className="current">Home</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Clients</a>
    <a href="#">Contact</a>
  </div>
));

NavbarLinks.displayName = 'NavbarLinks';

export default NavbarLinks;
