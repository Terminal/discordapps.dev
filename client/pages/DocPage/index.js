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
import Modesta from '../../data/Modesta';
import { connect } from 'react-redux';
import { fetchADoc } from '../../redux/actions/doc';

class DocPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchADoc({
      match: this.props.match,
      pathname: window.location.pathname
    }))
  }
  render() {
    const page = this.props.doc.data;
    const status = this.props.doc.status;

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
          <LinkButton to="/posts" className={Modesta.secondary}><FormattedMessage id="pages.docs.back" /></LinkButton>
          <ContentBox>
            <h2>{page.title}</h2>
            {page.by && <p><i><FormattedMessage id="pages.docs.by" values={{name: page.by}} /></i></p>}
            {page.date && <p>
              {date.toLocaleDateString(this.props.intl.locale, DateFormat)}
            </p>}
          </ContentBox>
          <DocPageContentBox page={page.content} forceLarge={true} allowHTML={true} cdn={Locations.docsServer} />
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

