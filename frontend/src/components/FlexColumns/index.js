import React from 'react';

const FlexColumns = ({ children, columns }) => (
  <div className={`col-xs-${columns}`}>
    {children}
  </div>
);

export default FlexColumns;
