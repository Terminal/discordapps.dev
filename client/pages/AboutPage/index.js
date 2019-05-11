import React, { Component } from 'react';
import Container from '../../components/Container';
import Layout from '../../components/Layout';
import ContentBox from '../../components/ContentBox';
import { Modesta } from '../../data/Styles';
import FlexColumns from '../../components/FlexColumns';
import GitHubButton from 'react-github-btn'

class AboutPage extends Component {
  render() {
    return (
      <Layout match={this.props.match}>
        <Container>
          <ContentBox>
            <h2>Discord Apps</h2>
            <p>
              Discord Apps is the longest running Open Source application store for Discord Bots and other Discord Applications.<br />
              We are empowered by members of the open source community to help contribute translations, fixes and overall presentation of the website.
            </p>
          </ContentBox>
          <ContentBox>
            <FlexColumns>
              <FlexColumns columns={6}>
                <h4>Open Source</h4>
                <p>We are open source</p>
              </FlexColumns>
              <FlexColumns columns={6}>
                <h4>Bot List People</h4>
                <p>
                  We're bad people
                </p>
              </FlexColumns>
              <FlexColumns columns={6}>
                <h4>Bot List People</h4>
                <p>
                  We're good people
                </p>
              </FlexColumns>
            </FlexColumns>
            <GitHubButton href="https://github.com/terminal/discordapps.dev" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star terminal/discordapps.dev on GitHub">Star</GitHubButton>
          </ContentBox>
        </Container>
      </Layout>
    );
  }
}

export default AboutPage;
