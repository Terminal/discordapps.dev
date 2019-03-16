import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Locations from '../data/Locations';
import ContentBox from '../components/ContentBox';
import FlexColumns from '../components/FlexColumns';
import FlexContainer from '../components/FlexContainer';
import InputField from '../components/InputField';
import Row from '../components/Row';

class EditBot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bot: null,
      notFound: false
    };
  }

  componentDidMount() {
    // Check if the bot has been injected
    if (!this.state.bot && this.props.match.params.id) {
      fetch(`${Locations.server}/${this.props.intl.locale}/reactjs/v1/bots/id/${this.props.match.params.id}`)
        .then(res => {
          return res.json()
        })
        .then((data) => {
          if (data.ok) {
            const bot = data.data;
            this.setState({
              bot
            });
          }
        })
    }
  }

  render() {
    const { bot } = this.state

    return (
      <Layout>
        <Container>
          <h1><FormattedMessage id="pages.edit.title" /></h1>
          <p><FormattedMessage id="pages.edit.required" /></p>
          <ContentBox>
            <h2><FormattedMessage id="pages.edit.basicinfo" /></h2>
            <Row>
              <InputField name="bot.id" id="pages.edit.client_id"/>
              <InputField name="bot.oauth" id="pages.edit.application_id"/>
            </Row>
            <Row>
              <InputField name="bot.invite" id="pages.edit.invite"/>
            </Row>
          </ContentBox>
        </Container>
      </Layout>
    );
  }
}

export default injectIntl(EditBot);
