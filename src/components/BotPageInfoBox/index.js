import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Locations from '../../data/Locations';
import ContentBox from '../ContentBox';
import FlexColumns from '../FlexColumns';
import FlexContainer from '../FlexContainer';
import LazyImage from '../LazyImage';
import styles from './index.module.scss';
import PrefixLabel from './PrefixLabel';
import { fetchAuthIfNeeded } from '../../redux/actions/auth';
import LocalisedHyperlink from '../LocalisedHyperlink';
import Modesta from '../../data/Modesta';

class BotPageInfoBox extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthIfNeeded());
  }
  render() {
    const { bot, auth } = this.props;
    return (
      <ContentBox>
        <FlexContainer>
          <div>
            <LazyImage src={`${Locations.server}${bot.cachedImages.avatar}`} className={styles.avatar} />
          </div>
          <div>
            <h3>
              {bot.contents[0].name}
            </h3>
            <p>
              {bot.contents[0].description}
            </p>
          </div>
        </FlexContainer>
        <FlexColumns>
          <FlexColumns columns={8}>
            <div>
              <FormattedMessage id="pages.bots.prefix" values={{
                count: bot.trigger.prefix.length
              }} />
              {bot.trigger.prefix.map(prefix => <PrefixLabel>{prefix}</PrefixLabel>)}
              {bot.trigger.customisable ? <PrefixLabel className={Modesta.midnightBlue}><FormattedMessage id="pages.bots.customisable" /></PrefixLabel> : null}
              {bot.trigger.mentionable ? <PrefixLabel className={Modesta.midnightBlue}><FormattedMessage id="pages.bots.mentionable" /></PrefixLabel> : null}
            </div>
            <div className={styles.links}>
              {bot.support ? <a href={bot.support}><FormattedMessage id="pages.bots.support" /></a> : null}
              {bot.website ? <a href={bot.website}><FormattedMessage id="pages.bots.website" /></a> : null}
              {bot.github && bot.github.owner && bot.github.repo ? <a href={`https://github.com/${bot.github.owner}/${bot.github.repo}`}><FormattedMessage id="pages.bots.github" /></a> : null}
            </div>
            { auth.data !== null ?
              <div className={styles.links}>
                {auth.data.admin || bot.authors.some(author => author.id === auth.data.id) ?
                  <>
                    <LocalisedHyperlink to={`/bots/${bot.id}/edit`}><FormattedMessage id="pages.bots.edit" /></LocalisedHyperlink>
                    <LocalisedHyperlink to={`/bots/${bot.id}/delete`}><FormattedMessage id="pages.bots.delete" /></LocalisedHyperlink>
                    <LocalisedHyperlink to={`/bots/${bot.id}/configure`}><FormattedMessage id="pages.bots.configure" /></LocalisedHyperlink>
                  </>
                : null
                }
              </div>
              : null
            }
          </FlexColumns>
          <FlexColumns columns={4} className={Modesta.rightText}>
            <a className={`${Modesta.btn} ${Modesta.discord}`} href={bot.invite}>
              <FormattedMessage id="pages.bots.invite" />
            </a>
          </FlexColumns>
        </FlexColumns>
      </ContentBox>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(BotPageInfoBox);
