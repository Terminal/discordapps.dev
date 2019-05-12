import qs from 'qs';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import BotCollection from '../../components/BotCollection';
import Container from '../../components/Container';
import ContentBox from '../../components/ContentBox';
import InputField from '../../components/InputField';
import Layout from '../../components/Layout';
import MultipleInputField from '../../components/MultipleInputField';
import Row from '../../components/Row';
import Locations from '../../data/Locations';
import States from '../../../data/States';
import Categories from '../../../data/Categories';
import calculateBotScore from '../../helpers/calulateBotScore';

class FilterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      message: null,
      owners: [],
      category: null,
      nsfw: null,
      query: null,
      timeout: null,
      hidden: true,
      type: null,
      state: null,
    }
    this.form = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {    
    if (this.props.location.search) {
      this.search(this.props.location.search)
    }
  }
  componentWillUnmount() {
    if (this.state.timeout) clearTimeout(this.state.timeout);
  }
  search(searchQuery) {
    fetch(`${Locations.server}/reactjs/v2/apps/search${searchQuery}`)
      .then(res => res.json())
      .then((data) => {
        if (data.ok) {
          this.setState({
            results: data.data
              .map(bot => calculateBotScore({
                bot,
                locale: this.props.intl.locale
              }))
              .sort((a, b) => b.random - a.random)
          });
        } else {
          this.setState({
            message: data.message
          });
        }
      });
    
    const query = qs.parse(window.location.search.replace(/^\?/, ''));

    this.setState({
      owners: query.owners,
      category: query.category,
      nsfw: query.nsfw,
      query: query.q,
      hidden: !(query.hidden === 'false'),
      state: query.state
    })
  }
  onChange(e) {
    const formdata = new FormData(this.form.current);
    const queryString = new URLSearchParams(formdata).toString();
    const timeout = setTimeout(() => {
      if (this.state.timeout === timeout) {
        if (queryString) {
          this.search(`?${queryString}`);
        }
      }
    }, 250)
    this.setState({
      timeout
    })
  }
  render() {
    const auth = this.props.auth.data;
    const { results, owners, category, nsfw, type, query, hidden, state } = this.state;

    return (
      <Layout match={this.props.match}>
        <Container>
          <form ref={this.form}>
            <ContentBox>
              <Row>
                <MultipleInputField name="owners[]" id="pages.filter.authors" value={owners} onChange={this.onChange}/>
                <InputField name="category" id="pages.filter.category" localiseOptions="categories" allowNone={true} options={Categories} value={category} onChange={this.onChange}/>
              </Row>
              <Row>
                <InputField name="q" id="pages.filter.query" value={query} onChange={this.onChange}/>
                <InputField name="nsfw" id="pages.filter.nsfw" localiseOptions="pages.filter.nsfw" allowNone={true} options={['sfw', 'nsfw']} value={nsfw} onChange={this.onChange}/>
              </Row>
              <Row>
                <InputField name="type" id="pages.filter.type" localiseOptions="pages.filter.type" allowNone={true} options={['bots', 'rpc']} value={type} onChange={this.onChange}/>
                <InputField style={auth && auth.admin ? {} : {
                  visibility: 'hidden',
                  position: 'fixed'
                }} name="state" id="pages.filter.state" localiseOptions="states" allowNone={true} options={Object.values(States)} value={state} onChange={this.onChange}/>
              </Row>
            </ContentBox>
          </form>
          {
            Array.isArray(results) ?
              <ContentBox>
                <BotCollection bots={
                  results
                    .sort((a, b) => {
                      if (this.state.state === States.APPROVED) return b.random - a.random;
                      return b.edited - a.edited;
                    })
                } hidden={hidden} />
              </ContentBox> :
              null
          }
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { bots, auth } = state;
  return { bots, auth };
}

const exportedComponent = connect(mapStateToProps)(injectIntl(FilterPage));

exportedComponent.serverFetch = [

]

export default exportedComponent;
