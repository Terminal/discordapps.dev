import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../../components/Container';
import ContentBox from '../../components/ContentBox';
import FlagLinks from '../../components/FlagLinks';
import Layout from '../../components/Layout';
import Locations from '../../data/Locations';
import qs from 'qs';

class Locale extends Component {
  render() {
    const query = qs.parse(this.props.location.search.replace(/^\?/, ''));
    return (
      <Layout match={this.props.match}>
        <Container>
          <ContentBox>
            <h2><FormattedMessage id="pages.locale.choose" /></h2>
            <FlagLinks unlocalisedPath={query.returnBrowserTo} />
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
