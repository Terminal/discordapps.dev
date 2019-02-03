import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAppsIfNeeded } from '../../redux/actions';
import FlexGrid from '../FlexGrid';
import FlexColumns from '../FlexColumns';
import PageContainer from '../PageContainer';
import HalfscreenFullscreen from '../HalfscreenFullscreen';


class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAppsIfNeeded());
  }

  render() {
    const { isFetching, apps } = this.props;
    const totalapps = apps.length;

    return (
      <div>
        <HalfscreenFullscreen className="center-text">
          <h1>Welcome!!!!!!</h1>
        </HalfscreenFullscreen>
        <PageContainer>
          <FlexGrid>
            <FlexColumns columns={4}>
              Flex
            </FlexColumns>
            <FlexColumns columns={8}>
              Flex
            </FlexColumns>
          </FlexGrid>

          {isFetching && totalapps === 0 && <h2>Loading...</h2>}
          {!isFetching && totalapps === 0 && <h2>Empty.</h2>}
          {JSON.stringify(apps)}
          <p>You&apos;re a gay</p>
        </PageContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isFetching, apps } = state;

  return {
    isFetching,
    apps
  };
};

export default connect(mapStateToProps)(App);
