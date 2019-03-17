import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Prompt } from 'react-router-dom';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Locations from '../data/Locations';
import ContentBox from '../components/ContentBox';
import { connect } from 'react-redux';
import InputField from '../components/InputField';
import Row from '../components/Row';
import { fetchCategoriesIfNeeded } from '../redux/actions/categories';
import MultipleInputField from '../components/MultipleInputField';
import Modesta from '../data/Modesta';

class EditBot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bot: null,
      notFound: false,
      edited: true,
      message: null,
      unlocalised: null,
      ok: null
    };

    this.form = React.createRef();
    this.submit = this.submit.bind(this);
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

  submit(e) {
    e.preventDefault();

    const formdata = new FormData(this.form.current);
    fetch(`${Locations.server}/bots/add`, {
      method: 'POST',
      body: formdata,
      credentials: 'include'
    })
      .then(data => data.json())
      .then(data => {
        this.setState({
          ok: data.ok,
          message: data.message || null,
          unlocalised: data.language || null
        })

        if (data.ok) {
          this.setState({
            edited: false
          })
        }
      })
  }

  render() {
    const { bot } = this.state
    const categories = this.props.categories.data

    return (
      <Layout>
        <FormattedMessage id="pages.edit.leave">
          {message => <Prompt when={this.state.edited} message={message} />}
        </FormattedMessage>
        <form ref={this.form} onSubmit={this.submit}>
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
              <h2><FormattedMessage id="pages.edit.images.title" /></h2>
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
              <h2><FormattedMessage id="pages.edit.triggermethods" /></h2>
              <Row>
                <MultipleInputField name="bot.trigger.prefix[]" id="pages.edit.prefix" value={bot && bot.trigger.prefix} />
              </Row>
              <Row>
                <InputField name="bot.trigger.customisable" id="pages.edit.customisable" value={bot && bot.trigger.customisable} toggle={true} />
                <InputField name="bot.trigger.mentionable" id="pages.edit.mentionable" value={bot && bot.trigger.mentionable} toggle={true} />
              </Row>
            </ContentBox>
            <ContentBox>
              <h2><FormattedMessage id="pages.edit.flags.title" /></h2>
              <Row>
                <InputField name="bot.flags.inAppPurchases" id="pages.edit.flags.inAppPurchases" value={bot && bot.flags && bot.flags.inAppPurchases} toggle={true} smallText={true} />
                <InputField name="bot.flags.adverts" id="pages.edit.flags.adverts" value={bot && bot.flags && bot.flags.adverts} toggle={true} smallText={true} />
              </Row>
            </ContentBox>
            <ContentBox>
              <h2><FormattedMessage id="pages.edit.sourcecode" /></h2>
              <Row>
                <InputField name="bot.github.owner" id="pages.edit.github_owner" value={bot && bot.github.owner} />
                <InputField name="bot.github.repo" id="pages.edit.github_repo" value={bot && bot.github.repo} />
              </Row>
            </ContentBox>
            <ContentBox>
              <h2><FormattedMessage id="pages.edit.information" /></h2>
              <p><FormattedMessage id="pages.edit.languages.modal" /></p>
            </ContentBox>
            <ContentBox>
              {
                this.state.message || this.state.unlocalised ?
                  <ContentBox className={this.state.ok ? Modesta.emerald : Modesta.alizarin}>
                    <p>
                      {
                        this.state.unlocalised ?
                        <FormattedMessage id={this.state.unlocalised} /> :
                        this.state.message
                      }
                    </p>
                  </ContentBox> :
                  <div>
                    <p><FormattedMessage id="pages.edit.updates" /></p>
                    <a className={`${Modesta.discord} ${Modesta.btn}`} target="_blank" rel="noopener noreferrer" href={Locations.discordServer}><FormattedMessage id="pages.edit.discord" /></a>
                  </div>
              }
              <button className={`${Modesta.discord} ${Modesta.btn}`}>Submit!</button>
            </ContentBox>
          </Container>
        </form>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { categories } = state;
  return { categories };
}

export default connect(mapStateToProps)(injectIntl(EditBot));

