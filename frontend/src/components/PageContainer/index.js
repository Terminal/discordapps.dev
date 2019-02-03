import React from 'react';

const PageContainer = ({ children, className }) => (
  <div className={`container ${className}`}>
    {children}
  </div>
);

export default PageContainer;
