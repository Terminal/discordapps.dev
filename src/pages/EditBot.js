import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Prompt, Redirect } from 'react-router-dom';
import Container from '../components/Container';
import ContentBox from '../components/ContentBox';
import FlexContainer from '../components/FlexContainer';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import MultipleInputField from '../components/MultipleInputField';
import PleaseLogin from '../components/PleaseLogIn';
import Row from '../components/Row';
import Locations from '../data/Locations';
import Modesta from '../data/Modesta';
import languages from '../locales';
import { fetchAuthIfNeeded } from '../redux/actions/auth';
import { fetchCategoriesIfNeeded } from '../redux/actions/categories';
import displayStyles from '../scss/display.module.scss';
import elementStyles from '../scss/elements.module.scss';
import { fetchABot, resetTheBot } from '../redux/actions/bot';

class EditBot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notFound: false,
      edited: true,
      message: null,
      unlocalised: null,
      ok: null,
      unusedLanguages: languages
        .filter(language => language.botPageLanguage)
        .map(language => language.code),
      usedLanguages: [],
      redirect: null,
      loadedExistingLanguages: false
    };

    this.form = React.createRef();
    this.languagesSelect = React.createRef();
    this.submit = this.submit.bind(this);
    this.addLanguage = this.addLanguage.bind(this);
    this.loadExistingLanguages = this.loadExistingLanguages.bind(this);
  }

  componentDidUpdate() {
    if (this.props.match.params.id) {
      this.loadExistingLanguages();
    }
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchCategoriesIfNeeded());
    dispatch(fetchAuthIfNeeded());

    // If editing a bot
    if (match.params.id) {
      dispatch(fetchABot({match}));
      this.loadExistingLanguages();
    }
  }

  loadExistingLanguages() {
    const bot = this.props.bot.data;

    if (!this.state.loadedExistingLanguages && bot && bot.contents) {
      console.log('reloading languages');

      this.setState({
        loadedExistingLanguages: true,
        unusedLanguages: languages
          .filter(language => language.botPageLanguage)
          .filter(language => !bot.contents.some(content => content.locale === language.code))
          .map(language => language.code),
        usedLanguages: languages
          .filter(language => language.botPageLanguage)
          .filter(language => bot.contents.some(content => content.locale === language.code))
          .map(language => language.code)
      });
    }
  }

  addLanguage(e) {
    e.preventDefault();
    const selected = this.languagesSelect.current.value;

    if (selected !== 'null') {
      this.setState({
        unusedLanguages: this.state.unusedLanguages.filter(language => language !== selected),
        usedLanguages: [...this.state.usedLanguages, selected]
      })
    }
  }

  removeLanguage(e, selected) {
    e.preventDefault();

    if (selected !== 'null') {
      this.setState({
        usedLanguages: this.state.usedLanguages.filter(language => language !== selected),
        unusedLanguages: [...this.state.unusedLanguages, selected]
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
          });
        }

        if (data.redirect) {
          const { dispatch } = this.props;
          dispatch(resetTheBot());
          setTimeout(() => {
            this.setState({
              redirect: data.redirect
            });
          }, 500);
        }
      })
  }

  render() {
    // Do not use redux bot if not editing
    const bot = this.props.match.params.id ? this.props.bot.data : null;
    const categories = this.props.categories.data
    const auth = this.props.auth.data

    if (!auth || !auth.id) {
      return (
        <PleaseLogin />
      )
    }

    if (this.state.redirect) {
      return (
        <Redirect to={`/${this.props.intl.locale}${this.state.redirect}`} />
      )
    }

    return (
      <Layout match={this.props.match}>
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
                <MultipleInputField name="bot.authors[]" id="pages.edit.authors" multiple={true} value={bot && bot.authors && bot.authors.map(author => author.id)} />
              </Row>
              <Row>
                <InputField name="bot.support" id="pages.edit.support" value={bot && bot.support} />
                <InputField name="bot.category" id="pages.edit.category" localiseOptions="categories" options={categories || []} value={bot && bot.category} />
              </Row>
              <Row>
                <InputField name="bot.website" id="pages.edit.website" value={bot && bot.website} />
                <InputField name="bot.nsfw" id="pages.edit.nsfw" value={bot && bot.nsfw} toggle={true} />
              </Row>
            </ContentBox>
            <ContentBox>
              <h2><FormattedMessage id="pages.edit.images.title" /></h2>
              <Row>
                <InputField name="bot.images.avatar" id="pages.edit.images.avatar" value={bot && bot.images && bot.images.avatar}/>
                <InputField name="bot.images.cover" id="pages.edit.images.cover" value={bot && bot.images && bot.images.cover}/>
              </Row>
              <Row>
                <InputField name="bot.videos.youtube" id="pages.edit.youtube" value={bot && bot.videos && bot.videos.youtube}/>
                <InputField name="bot.videos.youku" id="pages.edit.youku" value={bot && bot.videos && bot.videos.youku}/>
              </Row>
              <Row>
                <MultipleInputField name="bot.images.preview[]" id="pages.edit.images.preview" value={bot && bot.images && bot.images.preview} />
              </Row>
            </ContentBox>
            <ContentBox>
              <h2><FormattedMessage id="pages.edit.triggermethods" /></h2>
              <Row>
                <MultipleInputField name="bot.trigger.prefix[]" id="pages.edit.prefix" value={bot && bot.trigger && bot.trigger.prefix} />
              </Row>
              <Row>
                <InputField name="bot.trigger.customisable" id="pages.edit.customisable" value={bot && bot.trigger && bot.trigger.customisable} toggle={true} />
                <InputField name="bot.trigger.mentionable" id="pages.edit.mentionable" value={bot && bot.trigger && bot.trigger.mentionable} toggle={true} />
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
                <InputField name="bot.github.owner" id="pages.edit.github_owner" value={bot && bot.github && bot.github.owner} />
                <InputField name="bot.github.repo" id="pages.edit.github_repo" value={bot && bot.github && bot.github.repo} />
              </Row>
            </ContentBox>
            <ContentBox>
              <h2><FormattedMessage id="pages.edit.information" /></h2>
              <p><FormattedMessage id="pages.edit.languages.modal" /></p>
              <Row>
                <FlexContainer>
                  <select form="null" className={Modesta.fullWidth} defaultValue="null" ref={this.languagesSelect}>
                    <FormattedMessage id="forms.select">
                      {select => <option value="null" disabled>{select}</option>}
                    </FormattedMessage>
                    {
                      this.state.unusedLanguages.map(language => (
                        <FormattedMessage key={language} id={`locales.${language}`}>
                          {name => <option value={language}>{name}</option>}
                        </FormattedMessage>
                      ))
                    }
                  </select>
                  <button onClick={this.addLanguage} className={elementStyles.button}>
                    <FormattedMessage id="pages.edit.languages.add" />
                  </button>
                </FlexContainer>
              </Row>
            </ContentBox>
            {
              this.state.usedLanguages.map((language, index) => {
                const contents = bot && bot.contents && bot.contents.find(content => content.locale === language);
                return (
                  <ContentBox key={language}>
                    <FlexContainer>
                      <h3><FormattedMessage key={language} id={`locales.${language}`} /></h3>
                      <button onClick={(e) => this.removeLanguage(e, language)} className={elementStyles.button}>
                        <FormattedMessage id="pages.edit.deleteLanguage" />
                      </button>
                    </FlexContainer>
                    <Row>
                      <InputField name={`bot.contents[${index}][name]`} id="pages.edit.name" value={contents && contents.name} className={Modesta.fullWidth} />
                    </Row>
                    <Row>
                      <InputField name={`bot.contents[${index}][description]`} id="pages.edit.description" value={contents && contents.description} className={Modesta.fullWidth} />
                    </Row>
                    <Row>
                      <InputField name={`bot.contents[${index}][page]`} id="pages.edit.page" value={contents && contents.page} textarea={true} className={Modesta.fullWidth} />
                    </Row>
                    <input name={`bot.contents[${index}][locale]`} type="text" className={displayStyles.hidden} value={language}></input>
                  </ContentBox>
                )
              })
            }
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
              <button className={`${Modesta.discord} ${Modesta.btn}`}>
                <FormattedMessage id="forms.submit" />
              </button>
            </ContentBox>
          </Container>
        </form>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { categories, auth, bot } = state;
  return { categories, auth, bot };
}

export default connect(mapStateToProps)(injectIntl(EditBot));
