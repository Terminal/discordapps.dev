import React from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '../components/Container';
import ContentBox from '../components/ContentBox';
import Flex from '../components/FlexColumns';
import Layout from '../components/Layout';

export default () => (
  <Layout>
    <Container>
      <ContentBox>
        <FormattedMessage id="site.name" />
      </ContentBox>
      <Flex backwardsMobile="yesnt">
        <Flex columns="3">
          <ContentBox>
            <ul>
              {
                [1, 2, 3, 4, 5].map((x, index) => (
                  <li key={index}>Category {index}</li>
                ))
              }
            </ul>
          </ContentBox>
        </Flex>
        <Flex columns="9">
          <ContentBox>
            Hi
          </ContentBox>
        </Flex>
      </Flex>
    </Container>
  </Layout>
);
