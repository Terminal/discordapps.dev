import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import Layout from '../components/Layout';
import { fetchAuthIfNeeded } from '../redux/actions/auth';
import PleaseLogin from '../components/PleaseLogIn';
import PermissionDenied from '../components/PermissionDenied';
import States from '../data/States';
import LocalisedHyperlink from '../components/LocalisedHyperlink';
import { FormattedMessage } from 'react-intl';
import ContentBox from '../components/ContentBox';

class AdminPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthIfNeeded());
  }
  render() {
    const auth = this.props.auth.data;

    if (!auth || !auth.id) {
      return (
        <PleaseLogin match={this.props.match}/>
      )
    }

    if (!auth.admin) {
      return (
        <PermissionDenied match={this.props.match}/>
      )
    }

    return (
      <Layout match={this.props.match}>
        <Container>
          <ContentBox>
            <h1><FormattedMessage id="pages.admin.title" /></h1>
            <ul>
            {
              Object.values(States)
                .map(state =>
                  <li>
                    <LocalisedHyperlink to="/bots/filter" query={{
                      state: state
                    }}>
                      <FormattedMessage id={`states.${state}`} />
                    </LocalisedHyperlink>
                  </li>
                )
            }
            </ul>
          </ContentBox>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(AdminPage);
