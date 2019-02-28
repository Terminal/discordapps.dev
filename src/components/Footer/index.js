import React, { Component } from 'react';
import modesta from '../../ModestaCSS/scss/modesta.module.scss';
import styles from './index.module.scss';
import Container from '../Container';
import { FormattedMessage } from 'react-intl';

class Footer extends Component {
  render() {
    return (
      <Container className={styles.footer}>
        <div className={styles.links}>
          <a href="https://github.com/Terminal/ls.terminal.ink/wiki" target="_blank">
            <FormattedMessage id="footer.docs" />
          </a>
          <a href="https://github.com/Terminal/ls.terminal.ink/wiki/Terms-and-Conditions" target="_blank">
            <FormattedMessage id="footer.terms" />
          </a>
          <a href="https://github.com/Terminal/ls.terminal.ink/blob/ls13/LICENCE" target="_blank">
            <FormattedMessage id="footer.licence" />
          </a>
          <a href="https://github.com/Terminal/ls.terminal.ink/network/dependencies" target="_blank">
            <FormattedMessage id="footer.attribution" />
          </a>
          <a href="https://github.com/Terminal/ls.terminal.ink/tree/ls13" target="_blank">
            <FormattedMessage id="footer.source" />
          </a>
          <a href="https://discord.gg/8uC6aKZ" target="_blank" rel="noopener noreferrer">
            <FormattedMessage id="footer.discord" />
          </a>
          <a href="https://terminal.ink" target="_blank" rel="noopener noreferrer">
            <FormattedMessage id="footer.terminal" />
          </a>
        </div>
        <p className={styles.copyright}>
          <FormattedMessage id="copyright" />
        </p>
      </Container>
    )
  }
}

export default Footer;
