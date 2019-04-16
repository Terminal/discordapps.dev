import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import ContentBox from '../../components/ContentBox';
import Layout from '../../components/Layout';
import DateFormat from '../../data/DateFormat';
import Locations from '../../data/Locations';
import NotFound from '../NotFound';
import Container from '../../components/Container';
import LoadingContainer from '../../components/LoadingContainer';
import BotPageContentBox from '../../components/BotPageContentBox';
import LinkButton from '../../components/LinkButton';
import Modesta from '../../data/Modesta';

class DocPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      status: null
    }

    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    const path = this.props.location.pathname.substring(this.props.match.url.length);
    this.fetch(path);
  }
  fetch(path) {
    fetch(`${Locations.docsServer}/posts${path}`)
      .then((res) => {
        this.setState({
          status: res.status
        });
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        this.setState({
          page: data
        });
      });
  }
  render() {
    const { page, status } = this.state;

    if (status === 404) {
      return <NotFound match={this.props.match} />
    }

    if (!page) {
      return (
        <Layout match={this.props.match}>
          <LoadingContainer />
        </Layout>
      )
    }

    const date = new Date(page.date);

    return (
      <Layout match={this.props.match}>
        <Helmet>
          <title>{page.title}</title>
          <meta property="og:title" content={page.title}/>
          <meta property="og:description" content={page.description}/>
          <meta name="description" content={page.description}/>
          <meta httpEquiv="last-modified" content={date.toISOString().split('T')[0]} />
        </Helmet>
        <Container>
          <LinkButton to="/posts" className={Modesta.secondary}>Back</LinkButton>
          <ContentBox>
            <h2>{page.title}</h2>
            {page.by && <p><i>By {page.by}</i></p>}
            {page.date && <p>
              {date.toLocaleDateString(this.props.intl.locale, DateFormat)}
            </p>}
          </ContentBox>
          <BotPageContentBox page={page.content} forceLarge={true} allowHTML={true} />
        </Container>
      </Layout>
    );
  }
}

export default injectIntl(DocPage);
