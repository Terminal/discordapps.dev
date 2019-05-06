import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Locations from '../../data/Locations';
import Container from '../Container';
import styles from './index.module.scss';

class Footer extends Component {
  render() {
    return (
      <Container className={styles.footer}>
        <p className={styles.copyright}>
          <FormattedMessage id="copyright" />
        </p>
        <div className={styles.links}>
          <a href={Locations.wiki} target="_blank" rel="noopener noreferrer">
            <FormattedMessage id="footer.docs" />
          </a>
          <a href={Locations.termsAndConditions} target="_blank" rel="noopener noreferrer">
            <FormattedMessage id="footer.terms" />
          </a>
          <a href={Locations.discordServer} target="_blank" rel="noopener noreferrer">
            <FormattedMessage id="footer.discord" />
          </a>
          <a href={Locations.sourceCode} target="_blank" rel="noopener noreferrer">
            <FormattedMessage id="footer.source" />
          </a>
        </div>
      </Container>
    )
  }
}

export default Footer;
