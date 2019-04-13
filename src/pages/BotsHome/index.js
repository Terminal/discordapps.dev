import React, { Component } from 'react';
import CategoriesLinksList from '../../components/BotCategoriesLinksList';
import CategoryCollection from '../../components/BotCategoryCollection';
import Container from '../../components/Container';
import Flex from '../../components/FlexColumns';
import HelpUsImprove from '../../components/HelpUsImprove';
import Layout from '../../components/Layout';
import PleaseAddYourBotPleaseThanks from '../../components/GetStartedWithBots';
import { fetchCategoriesIfNeeded } from '../../redux/actions/categories';
import WebsiteTypeButtons from '../../components/WebsiteTypeButtons';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';

class BotsHome extends Component {
  render() {
    return (
      <Layout match={this.props.match}>
        {/* <FormattedMessage id="pages.bots.index.title">
          {
            title =>
            <FormattedMessage id="pages.bots.index.description">
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
        </FormattedMessage> */}
        <Container>
          <Flex padding={true}>
            <Flex columns={3}>
              <WebsiteTypeButtons />
              <CategoriesLinksList />
              <HelpUsImprove />
            </Flex>
            <Flex columns={9}>
              <CategoryCollection />
            </Flex>
          </Flex>
          <PleaseAddYourBotPleaseThanks />
        </Container>
      </Layout>
    );
  }
}

BotsHome.serverFetch = [
  fetchCategoriesIfNeeded
]

export default BotsHome;
