import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Locations from '../../data/Locations';
import Container from '../Container';
import styles from './index.module.scss';
import LocalisedHyperlink from '../LocalisedHyperlink';

class Footer extends Component {
  render() {
    return (
      <Container className={styles.footer}>
        <p className={styles.copyright}>
          <FormattedMessage id="copyright" />
        </p>
        <div className={styles.links}>
          <LocalisedHyperlink to={Locations.wiki}>
            <FormattedMessage id="footer.docs" />
          </LocalisedHyperlink>
          <LocalisedHyperlink to='/posts/docs/terms/'>
            <FormattedMessage id="footer.terms" />
          </LocalisedHyperlink>
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
