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
import DocPageContentBox from './DocPageContentBox';
import LinkButton from '../../components/LinkButton';
import { Modesta } from '../../data/Styles';
import { connect } from 'react-redux';
import { fetchADoc } from '../../redux/actions/doc';
import frontmatter from 'front-matter';

class DocPage extends Component {
  constructor(props) {
    super(props);
    this.requestURL = props.location.pathname.substring(props.match.url.length);
  }
  afterFetch() {
    const element = document.getElementById(window.location.hash.substr(1))
    if (element) {
      window.scrollTo(0, element.offsetTop);
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const promise = dispatch(fetchADoc({
      url: this.requestURL
    }))

    if (promise) promise.then(this.afterFetch);
  }
  componentDidUpdate() {
    const { dispatch } = this.props;
    const promise = dispatch(fetchADoc({
      url: this.requestURL
    }))

    if (promise) promise.then(this.afterFetch);
  }
  render() {
    const markdown = this.props.doc.data;
    const status = this.props.doc.status;

    if (status === 404) {
      return <NotFound match={this.props.match} />
    }

    if (!markdown) {
      return (
        <Layout match={this.props.match}>
          <LoadingContainer />
        </Layout>
      )
    }

    const page = frontmatter(markdown);

    const date = new Date(page.attributes.date);

    return (
      <Layout match={this.props.match}>
        <Helmet>
          <title>{page.title}</title>
          <meta property="og:title" content={page.attributes.title}/>
          <meta property="og:description" content={page.attributes.description}/>
          <meta name="description" content={page.attributes.description}/>
          <meta httpEquiv="last-modified" content={date.toISOString().split('T')[0]} />
        </Helmet>
        <Container>
          <LinkButton to="/posts" className={Modesta.secondary}><FormattedMessage id="pages.docs.back" /></LinkButton>
          <ContentBox>
            <h2>{page.attributes.title}</h2>
            {page.attributes.by && <p><i><FormattedMessage id="pages.docs.by" values={{name: page.attributes.by}} /></i></p>}
            {page.attributes.date && <p>
              {date.toLocaleDateString(this.props.intl.locale, DateFormat)}
            </p>}
          </ContentBox>
          <DocPageContentBox page={page.body} requestURL={this.requestURL} />
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { doc } = state;
  return { doc };
}

const exportedComponent = connect(mapStateToProps)(injectIntl(DocPage));

exportedComponent.serverFetch = [
  {
    function: fetchADoc,
    pass: ['match', 'pathname'],
    payload: {}
  }
]

export default exportedComponent;

