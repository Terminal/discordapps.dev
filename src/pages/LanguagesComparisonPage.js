import React, { Component } from 'react';
import Container from '../components/Container';
import ContentBox from '../components/ContentBox';
import Layout from '../components/Layout';

import languages, { getMasterLanguage } from '../locales';
import flat from 'flat';
import { injectIntl, FormattedMessage } from 'react-intl';
import Modesta from '../data/Modesta';
import Row from '../components/Row';
import FlexContainer from '../components/FlexContainer';
import elementStyles from '../scss/elements.module.scss';

class LanguagesComparisonPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguages: []
    };
    this.languagesSelect = React.createRef();
    this.addLanguage = this.addLanguage.bind(this);
  }
  addLanguage(e) {
    e.preventDefault();
    const selected = this.languagesSelect.current.value;

    this.setState({
      selectedLanguages: [...this.state.selectedLanguages, selected]
    })
  }
  render() {
    const intl = this.props.intl;

    const selectedLanguages = this.state.selectedLanguages;

    const languageKeys = languages
      .filter(lang => lang.translations)
      .map(lang => lang.code);

    const unusedKeys = languages
      .filter(lang => lang.translations)
      .map(lang => lang.translations)
      .map(lang => Object.keys(flat(lang)))
      .reduce((prev, curr) => prev.concat(curr), [])
      .reduce((prev, curr) => {
        prev[curr] = false;
        return prev;
      }, {})
    
    const localisations = languages
      .filter(lang => lang.translations)
      .reduce((prev, curr) => {
        prev[curr.code] = flat(curr.translations);
        return prev;
      }, {});

    return (
      <Layout match={this.props.match}>
        <ContentBox>
          <Row>
            <FlexContainer>
              <select form="null" className={Modesta.fullWidth} defaultValue="null" ref={this.languagesSelect}>
                {
                  languageKeys
                    .map(language => ({
                      language,
                      message: intl.formatMessage({
                        id: `locales.${language}`
                      })
                    }))
                    .sort((a, b) => a.message.localeCompare(b.message))
                    .map(({language, message}) => <option key={language} value={language}>{message || ''}</option>)
                }
              </select>
              <button onClick={this.addLanguage} className={elementStyles.button}>
                <FormattedMessage id="pages.edit.languages.add" />
              </button>
            </FlexContainer>
          </Row>
          <div className={`${Modesta.tableContainer} ${Modesta.tableCenter}`} style={{maxWidth: '100vw'}}>
            <table style={{whiteSpace: 'normal'}}>
              <thead>
                <tr>
                  <td>Key</td>
                  {
                    selectedLanguages.map(locale => <td key={locale}>{locale}</td>)
                  }
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Master Language</b>
                    <p>The language this inherits from, for bot page scoring</p>
                  </td>
                  {
                    selectedLanguages.map(locale =>
                      <td key={locale}>{getMasterLanguage(locale)}</td>
                    )
                  }
                </tr>
                {
                  Object.keys(unusedKeys).map(key =>
                    <tr key={key}>
                      <td>
                        {key}
                      </td>
                      {
                        selectedLanguages.map(locale =>
                          <td key={locale}>{localisations[locale][key]}</td>
                        )
                      }
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </ContentBox>
      </Layout>
    );
  }
}

export default injectIntl(LanguagesComparisonPage);
