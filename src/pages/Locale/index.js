import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../../components/Container';
import ContentBox from '../../components/ContentBox';
import FlagLinks from '../../components/FlagLinks';
import Layout from '../../components/Layout';
import Modesta from '../../data/Modesta';
import Locations from '../../data/Locations';

class Locale extends Component {
  render() {
    return (
      <Layout match={this.props.match}>
        <Container>
          <ContentBox className={Modesta.center}>
            <h2><FormattedMessage id="pages.locale.choose" /></h2>
            <FlagLinks />
            <p>
              <a href={Locations.sourceTranslations}>
                <FormattedMessage id="pages.locale.pleasehelp"></FormattedMessage>
              </a>
            </p>
          </ContentBox>
        </Container>
      </Layout>
    )
  }
}

export default Locale;
