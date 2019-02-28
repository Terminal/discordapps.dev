import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const LocalizedLink = ({ to, intl: { locale }, query, ...props }) => {
  let querylink = '';

  if (query) {
    querylink = '?' +
    Object.keys(query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&');
  }

  const path = `/${locale}${to}${querylink}`;

  return <Link {...props} to={path} />;
};

export default injectIntl(LocalizedLink);
