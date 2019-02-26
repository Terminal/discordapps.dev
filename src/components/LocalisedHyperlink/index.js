import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const LocalizedLink = ({ to, intl: { locale }, ...props }) => {
  const path = `/${locale}${to}`;

  return <Link {...props} to={path} />;
};

export default injectIntl(LocalizedLink);
