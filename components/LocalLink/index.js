import React from 'react';
import { injectIntl } from 'react-intl';

import locales from '../../locales';

const LocalizedLink = ({ to, intl: { locale }, ...props }) => {
  const path = locales[locale].default ? to : `/${locale}${to}`;

  return <a {...props} href={path} />;
};

export default injectIntl(LocalizedLink);
