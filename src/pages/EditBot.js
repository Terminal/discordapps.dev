import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Locations from '../data/Locations';
import ContentBox from '../components/ContentBox';
import { connect } from 'react-redux';
import InputField from '../components/InputField';
import Row from '../components/Row';
import { fetchCategoriesIfNeeded } from '../redux/actions/categories';
import MultipleInputField from '../components/MultipleInputField';

class EditBot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bot: null,
      notFound: false
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
    
    // Check if the bot has been injected
    if (!this.state.bot && this.props.match.params.id) {
      fetch(`${Locations.server}/reactjs/v1/bots/id/${this.props.match.params.id}`)
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
    const categories = this.props.categories.data

    return (
      <Layout>
        <Container>
          <h1><FormattedMessage id="pages.edit.title" /></h1>
          <p><FormattedMessage id="pages.edit.required" /></p>
          <ContentBox>
            <h2><FormattedMessage id="pages.edit.basicinfo" /></h2>
            <Row>
              <InputField name="bot.id" id="pages.edit.client_id" value={bot && bot.id}/>
              <InputField name="bot.oauth" id="pages.edit.application_id" value={bot && bot.oauth} />
            </Row>
            <Row>
              <InputField name="bot.invite" id="pages.edit.invite" value={bot && bot.invite} />
              <MultipleInputField name="bot.authors[]" id="pages.edit.authors" multiple={true} value={bot && bot.authors.map(author => author.id)} />
            </Row>
            <Row>
              <InputField name="bot.support" id="pages.edit.support" value={bot && bot.support} />
              <InputField name="bot.category" id="pages.edit.category" options={categories || []} value={bot && bot.category} />
            </Row>
            <Row>
              <InputField name="bot.website" id="pages.edit.website" value={bot && bot.website} />
              <InputField name="bot.nsfw" id="pages.edit.nsfw" value={bot && bot.nsfw} toggle={true} />
            </Row>
          </ContentBox>
          <ContentBox>
            <h1><FormattedMessage id="pages.edit.appearance" /></h1>
            <Row>
              <InputField name="bot.images.avatar" id="pages.edit.images.avatar" value={bot && bot.images.avatar}/>
              <InputField name="bot.images.cover" id="pages.edit.images.cover" value={bot && bot.images.cover}/>
            </Row>
            <Row>
              <InputField name="bot.videos.youtube" id="pages.edit.youtube" value={bot && bot.videos.youtube}/>
              <InputField name="bot.videos.youku" id="pages.edit.youku" value={bot && bot.videos.youku}/>
            </Row>
            <Row>
              <MultipleInputField name="bot.images.preview[]" id="pages.edit.images.preview" value={bot && bot.images.preview} />
            </Row>
          </ContentBox>
          <ContentBox>
            <Row>
              <MultipleInputField name="bot.trigger.prefix[]" id="pages.edit.prefix" value={bot && bot.trigger.prefix} />
            </Row>
          </ContentBox>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { categories } = state;
  return { categories };
}

export default connect(mapStateToProps)(injectIntl(EditBot));

