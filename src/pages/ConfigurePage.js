import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Locations from '../data/Locations';
import NotFound from './NotFound';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Localise } from '../locales';
import ContentBox from '../components/ContentBox';
import Modesta from '../data/Modesta';
import LoadingContainer from '../components/LoadingContainer';
import PermissionDenied from '../components/PermissionDenied';

class ConfigurePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bot: null,
      notFound: false,
      notAllowed: false
    };
  }

  componentDidMount() {
    // Check if the bot has been injected
    if (!this.state.bot) {
      fetch(`${Locations.server}/reactjs/v1/bots/id/${this.props.match.params.id}/configure`, {
        credentials: 'include'
      })
        .then(res => {
          if (res.status === 404) {
            this.setState({
              notFound: true
            });
          } else if (res.status === 401) {
            this.setState({
              notAllowed: true
            });
          }
          return res.json()
        })
        .then((data) => {
          if (data.ok) {
            const bot = data.data;
            this.setState({
              bot
            });
          }
        })
    }
  }

  render() {
    if (this.state.notFound) {
      return (
        <NotFound match={this.props.match}/>
      );
    }

    if(this.state.notAllowed) {
      return (
        <PermissionDenied match={this.props.match}/>
      )
    }
    
    if (!this.state.bot) {
      return (
        <Layout match={this.props.match}>
          <LoadingContainer />
        </Layout>
      );
    }

    const { bot } = this.state
    const contents = Localise(this.state.bot.contents, this.props.intl.locale);

    return (
      <Layout match={this.props.match}>
        <Helmet>
          <title>{contents.name}</title>
        </Helmet>
        <Container>
          <ContentBox>
            <h2><FormattedMessage id="pages.configuration.token.title" /></h2>
            <p><FormattedMessage id="pages.configuration.token.description" /></p>
            <ContentBox className={Modesta.secondary}>
              <code>
                {bot.token}
              </code>
            </ContentBox>
            <a className={`${Modesta.btn} ${Modesta.github}`} href={Locations.wiki} target="_blank" rel="noopener noreferrer"><FormattedMessage id="pages.configuration.token.docs" /></a>
          </ContentBox>
        </Container>
      </Layout>
    );
  }
}

export default injectIntl(ConfigurePage);
