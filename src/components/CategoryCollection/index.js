import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import styles from './index.module.scss';
import { fetchCategoriesIfNeeded } from '../../redux/actions/categories';
import Locations from '../../data/Locations';

import { injectIntl } from 'react-intl';
import BotCard from '../BotCard';
import LocalisedHyperlink from '../LocalisedHyperlink';
import { getMasterLanguage } from '../../locales';

class CategoryCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bots: []
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());

    fetch(`${Locations.server}/reactjs/v1/bots`)
      .then(res => res.json())
      .then((data) => {
        if (data.ok) {
          this.setState({
            bots: data.data
              .filter(bot => bot.state === 'approved')
              .map(bot => {
                if (bot.contents.some(contents => contents.locale === this.props.intl.locale || contents.locale === getMasterLanguage(this.props.intl.locale))) {
                  bot.random += 10;
                }
                return bot;
              })
              .sort((a, b) => b.random - a.random)
          })
        }
      });
  }
  render() {
    const categories = this.props.categories.data
    const { bots } = this.state
    return (
      <div>
        {
          categories
            // List categories that are not empty
            .filter(category => bots.filter(bot => bot.category === category).length)
            .map(category => {
              const botsInCategory = bots
                .filter(bot => bot.category === category)
              return (
                <ContentBox key={category}>
                  <div className={styles.heading}>
                    <h4 className={styles.grow} id={category}>
                      <LocalisedHyperlink to="/bots" query={{category}}>
                        <FormattedMessage id={`categories.${category}`} />
                      </LocalisedHyperlink>
                    </h4>
                    { botsInCategory.length > 8 ?
                      <LocalisedHyperlink to="/bots" query={{category}}>
                        <FormattedMessage id="components.categorycollection.morebots" />
                      </LocalisedHyperlink> :
                      null
                    }
                  </div>
                  <div className={styles.collection}>
                    {
                      // Find bots that fit in the category
                      botsInCategory
                        .filter(bot => bot.contents.length > 0) // Remove bots without contents
                        .filter(bot => bot.hide === false) // Remove hidden bots
                        .slice(0, 8)
                        .map(bot => {
                          bot.contents = bot.contents[this.props.intl.locale] ? bot.contents[this.props.intl.locale] : bot.contents[0];
                          return bot;
                        })
                        .map(bot => (
                          <BotCard key={bot.id} bot={bot} />
                        ))
                    }
                  </div>
                </ContentBox>
              )
            })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { categories } = state;
  return { categories };
}

export default connect(mapStateToProps)(injectIntl(CategoryCollection));
