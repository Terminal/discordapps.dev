import React from 'react';
import { FormattedMessage } from 'react-intl';
import PageContainer from '../PageContainer';

import styles from './index.scss';

const Footer = () => (
  <PageContainer className="right-text">
    <p>
      <a styleName="styles.footer-link" href="https://github.com/Terminal/Discord_Fork/blob/v2/LICENCE">
        <FormattedMessage id="footer.licence" />
      </a>
      <a styleName="styles.footer-link" href="https://github.com/Terminal/Discord_Fork/network/dependencies">
        <FormattedMessage id="footer.attribution" />
      </a>
      <a styleName="styles.footer-link" href="https://github.com/Terminal/Discord_Fork">
        <FormattedMessage id="footer.source" />
      </a>
      <a styleName="styles.footer-link" href="https://discord.gg/8uC6aKZ" target="_blank" rel="noopener noreferrer">
        <FormattedMessage id="footer.terminal" />
      </a>
    </p>
    <p>
      <FormattedMessage id="copyright" />
    </p>
  </PageContainer>
);

export default Footer;
