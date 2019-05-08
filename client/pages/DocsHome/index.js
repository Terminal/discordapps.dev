import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import Button from '../../components/Button';
import Container from '../../components/Container';
import ContentBox from '../../components/ContentBox';
import Layout from '../../components/Layout';
import LoadingContainer from '../../components/LoadingContainer';
import LocalisedHyperlink from '../../components/LocalisedHyperlink';
import DateFormat from '../../data/DateFormat';
import Locations from '../../data/Locations';
import { Modesta } from '../../data/Styles';

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
    this.fetch('all');
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

    // keep howto on top
    const categories = ['howto'];
    results.forEach((post) => {
      if (!categories.includes(post.type)) {
        categories.push(post.type)
      }
    });
    
    return (
      <Layout match={this.props.match}>
        <FormattedMessage id="pages.docs.title">
          {
            title =>
            <FormattedMessage id="pages.docs.description">
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
            categories.map(category =>
              <ContentBox>
                <h3><FormattedMessage id={`pages.docs.headers.${category}`} /></h3>
                {
                  results.filter(page => page.type === category)
                    .map(page => <p>
                      <LocalisedHyperlink to={page.permalink}>
                        {page.title}
                      </LocalisedHyperlink>
                    </p>)
                }
              </ContentBox>
            )
          }
        </Container>
      </Layout>
    );
  }
}

export default injectIntl(DocsHome);
