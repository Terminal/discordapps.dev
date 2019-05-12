import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Locations from '../../data/Locations';
import { getMasterLanguage } from '../../locales';
import Categories from '../../../data/Categories';
import BotCollection from '../BotCollection';
import ContentBox from '../ContentBox';
import LoadingContentBox from '../LoadingContentBox';
import LocalisedHyperlink from '../LocalisedHyperlink';
import styles from './index.module.scss';
import States from '../../../data/States';
import calculateBotScore from '../../helpers/calulateBotScore';

class CategoryCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bots: []
    }
  }
  componentDidMount() {
    fetch(`${Locations.server}/reactjs/v2/apps/search?type=bots&approved=${States.APPROVED}`)
      .then(res => res.json())
      .then((data) => {
        if (data.ok) {
          this.setState({
            bots: data.data
              .filter(bot => bot.state === 'approved')
              .filter(bot => bot.hide !== true)
              .map(bot => calculateBotScore({
                bot,
                locale: this.props.intl.locale
              }))
              .sort((a, b) => b.random - a.random)
          })
        }
      });
  }
  render() {
    const { bots } = this.state

    const botsInMyLanguage = bots
      .filter(bot => bot.contents.some(contents => contents.locale === this.props.intl.locale || contents.locale === getMasterLanguage(this.props.intl.locale)));

    return (
      <div>
        {
          botsInMyLanguage.length !== 0 && getMasterLanguage(this.props.intl.locale) !== 'en-GB' ?
            <ContentBox>
              <h4><FormattedMessage id="pages.bots.inMyLanguage" /></h4>
              <BotCollection bots={
                botsInMyLanguage
              } limit={9} hidden={true}/>
            </ContentBox> :
            null
        }
        {
          Categories
            .filter(category => bots.filter(bot => bot.category === category).length) // List categories that are not empty
            .map(a => [a, Math.random()]) // Randomise the order of the categories
            .sort((a, b) => a[1] - b[1])
            .map(a => a[0])
            .map(category => {
              const botsInCategory = bots
                .filter(bot => bot.category === category)
              return (
                <ContentBox key={category}>
                  <div className={styles.heading}>
                    <h4 className={styles.grow} id={category}>
                      <LocalisedHyperlink to="/filter" query={{
                        category,
                        state: States.APPROVED
                      }}>
                        <FormattedMessage id={`categories.${category}`} />
                      </LocalisedHyperlink>
                    </h4>
                    { botsInCategory.length > 8 ?
                      <LocalisedHyperlink to="/filter" query={{
                        category,
                        state: States.APPROVED
                      }}>
                        <FormattedMessage id="components.categorycollection.morebots" />
                      </LocalisedHyperlink> :
                      null
                    }
                  </div>
                  <BotCollection bots={botsInCategory} limit={9} hidden={true}/>
                </ContentBox>
              )
          })
        }
      </div>
    )
  }
}

export default injectIntl(CategoryCollection);
