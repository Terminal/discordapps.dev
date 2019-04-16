import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import BotCollection from '../../components/BotCollection';
import Container from '../../components/Container';
import ContentBox from '../../components/ContentBox';
import Flex from '../../components/FlexColumns';
import PleaseAddYourBotPleaseThanks from '../../components/GetStartedWithBots';
import Layout from '../../components/Layout';
import LoadingContentBox from '../../components/LoadingContentBox';
import WebsiteTypeButtons from '../../components/WebsiteTypeButtons';
import Locations from '../../data/Locations';
import States from '../../data/States';
import Button from '../../components/Button';
import Modesta from '../../data/Modesta';
import DateFormat from '../../data/DateFormat';
import LocalisedHyperlink from '../../components/LocalisedHyperlink';
import NotFound from '../NotFound';
import LoadingContainer from '../../components/LoadingContainer';

class DocsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      loadAll: false
    }

    this.loadAll = this.loadAll.bind(this);
    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    this.fetch('index');
  }
  loadAll() {
    this.setState({
      loadAll: true
    });
    fetch('all');
  }
  fetch(type) {
    fetch(`${Locations.docsServer}/${type}.json`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          results: data
        });
      });
  }
  render() {
    const results = this.state.results;

    if (!Array.isArray(results)) {
      return <Layout match={this.props.match}>
        <LoadingContainer />
      </Layout>
    }
    
    return (
      <Layout match={this.props.match}>
        <FormattedMessage id="pages.rpc.index.title">
          {
            title =>
            <FormattedMessage id="pages.rpc.index.description">
              {description =>
                <Helmet>
                  <title>{title}</title>
                  <meta property="og:title" content={title}/>
                  <meta property="og:description" content={description}/>
                  <meta name="description" content={description}/>
                </Helmet>
              }
          </FormattedMessage>
          }
        </FormattedMessage>
        <Container>
        {
          results.map((page) =>
            <ContentBox key={page.permalink}>
              <LocalisedHyperlink to={page.permalink}>
                <h2>{page.title}</h2>
              </LocalisedHyperlink>
              {page.by && <p><i><FormattedMessage id="pages.docs.by" values={{name: page.by}} /></i></p>}
              {page.date && <p>
                {new Date(page.date).toLocaleDateString(this.props.intl.locale, DateFormat)}
              </p>}
            </ContentBox>
          )
        }
        </Container>
        <Container className={Modesta.center}>
          {
            this.state.loadAll ? 
            <p><FormattedMessage id="pages.docs.noMore" /></p> :
            <Button onClick={this.loadAll} className={Modesta.primary}><FormattedMessage id="pages.docs.more" /></Button>
          }
        </Container>
      </Layout>
    );
  }
}

export default injectIntl(DocsHome);
