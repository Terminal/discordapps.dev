import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAppsIfNeeded } from '../../redux/actions';
import FlexGrid from '../FlexGrid';
import FlexColumns from '../FlexColumns';
import PageContainer from '../PageContainer';
import HalfscreenFullscreen from '../HalfscreenFullscreen';

class HomePagePage extends Component {
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
              {
                apps.map(app => (
                  <h3 key={app.id}>{app.name}</h3>
                ))
              }
            </FlexColumns>
          </FlexGrid>

          {isFetching && totalapps === 0 && <h2>Loading...</h2>}
          {!isFetching && totalapps === 0 && <h2>Empty.</h2>}
          {JSON.stringify(apps)}
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

export default connect(mapStateToProps)(HomePagePage);
