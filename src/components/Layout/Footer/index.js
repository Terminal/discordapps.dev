import React, { Component } from 'react';
import styles from './index.module.scss';
import Container from '../../Container';
import { FormattedMessage } from 'react-intl';
import Locations from '../../../data/Locations';
import ContentBox from '../../ContentBox';
import ConstructCSS from '../../../helpers/ConstructCSS';
import containers from '../containers.module.scss';

class Footer extends Component {
  render() {
    return (
      <Container className={ConstructCSS(containers.footer, styles.footer)}>
        <ContentBox>
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
            <a href={Locations.terminalInk} target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="footer.terminal" />
            </a>
          </div>
          <p className={styles.copyright}>
            <FormattedMessage id="copyright" />
          </p>
          <p className={ConstructCSS(styles.copyright, styles.small)}>
            <FormattedMessage id="footer.apple" />
          </p>
          <p className={styles.copyright}>
            <FormattedMessage id="footer.foss" />
          </p>
          <div className={styles.links}>
            <a href={Locations.sourceLicence} target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="footer.licence" />
            </a>
            <a href={Locations.sourceDependencies} target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="footer.attribution" />
            </a>
            <a href={Locations.sourceCode} target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="footer.source" />
            </a>
          </div>
        </ContentBox>
      </Container>
    )
  }
}

export default Footer;
