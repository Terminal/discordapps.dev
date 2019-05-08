import React from 'react';
import { injectIntl } from 'react-intl';
import { HashLink as Link } from 'react-router-hash-link';

const LocalizedLink = ({ to, intl: { locale }, query, hash, ...props }) => {
  let querylink = '';
  let hashlink = '';

  if (query) {
    querylink = '?' +
    Object.keys(query)
      .map(key => {
        if (Array.isArray(query[key])) {
          return query[key]
            .map(value => `${encodeURIComponent(key)}[]=${encodeURIComponent(value)}`)
            .join('&')
        }

        return `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
      })
      .join('&');
  }

  if (hash) {
    hashlink = `#${encodeURIComponent(hash)}`
  }

  const path = `/${locale}${to}${querylink}${hashlink}`;

  return <Link {...props} to={path} />;
};

export default injectIntl(LocalizedLink);
