import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
import NotALink from '../NotALink';

class BotPageInfoBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sure: false,
      deleted: false
    }

    this.openSure = this.openSure.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthIfNeeded());
  }
  openSure() {
    this.setState({
      sure: true
    });
  }
  delete() {
    fetch(`${Locations.server}/bots/${this.props.bot.id}/delete`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) this.setState({
          deleted: true
        });
      })
  }
  render() {
    if (this.state.deleted) {
      return (
        <Redirect to="/" />
      )
    }

    const { bot, auth, contents } = this.props;
    return (
      <ContentBox>
        <FlexContainer>
          <div>
            <LazyImage src={`${Locations.cdn}${bot.cachedImages.avatar}`} className={styles.avatar} />
          </div>
          <div>
            <h3>
              {contents.name}
            </h3>
            <p>
              {contents.description}
            </p>
            <p>
              {bot.nsfw ? <>
                <PrefixLabel className={Modesta.alizarin}><FormattedMessage id="pages.bots.nsfw" /></PrefixLabel>
              </> : null}
              {bot.state !== 'approved' ? <>
                <PrefixLabel className={Modesta.alizarin}><FormattedMessage id={`states.${bot.state}`} /></PrefixLabel>
              </> : null}
            </p>
          </div>
        </FlexContainer>
        <FlexColumns>
          <FlexColumns columns={8}>
            {
              bot.trigger &&
              <div>
                <FormattedMessage id="pages.bots.prefix" values={{
                  count: bot.trigger.prefix.length
                }} />
                {bot.trigger.prefix.map((prefix, index) => <PrefixLabel key={index}>{prefix}</PrefixLabel>)}
                {bot.trigger.customisable ? <PrefixLabel className={Modesta.midnightBlue}><FormattedMessage id="pages.bots.customisable" /></PrefixLabel> : null}
                {bot.trigger.mentionable ? <PrefixLabel className={Modesta.midnightBlue}><FormattedMessage id="pages.bots.mentionable" /></PrefixLabel> : null}
              </div>
            }
            <div className={styles.links}>
              {bot.support ? <a href={bot.support}><FormattedMessage id="pages.bots.support" /></a> : null}
              {bot.website ? <a href={bot.website}><FormattedMessage id="pages.bots.website" /></a> : null}
              {bot.github && bot.github.owner && bot.github.repo ? <a href={`https://github.com/${bot.github.owner}/${bot.github.repo}`}><FormattedMessage id="pages.bots.github" /></a> : null}
              { auth.data !== null && (auth.data.admin || bot.authors.some(author => author.id === auth.data.id)) ?
                <>
                  <LocalisedHyperlink to={`/${bot.type}/${bot.id}/edit`}><FormattedMessage id={`pages.${bot.type}.edit`} /></LocalisedHyperlink>
                  {
                    this.state.sure ?
                      <>
                        <NotALink onClick={this.delete}><FormattedMessage id="pages.bots.reallyDelete" /></NotALink>
                      </> :
                      <NotALink onClick={this.openSure}><FormattedMessage id="pages.bots.delete" /></NotALink>
                  }
                  <LocalisedHyperlink to={`/bots/${bot.id}/configure`}><FormattedMessage id="pages.bots.configure" /></LocalisedHyperlink>
                </>
                : null
              }
            </div>
            {
              bot.flags && bot.flags.adverts ?
                <div>
                  <FormattedMessage id="pages.bots.adverts" />
                </div> :
                null
            }
            {
              bot.flags && bot.flags.inAppPurchases ?
                <div>
                  <FormattedMessage id="pages.bots.inAppPurchases" />
                </div> :
                null
            }
          </FlexColumns>
          <FlexColumns columns={4} className={Modesta.rightText}>
            <a className={`${Modesta.btn} ${Modesta.discord}`} href={bot.invite}>
              <FormattedMessage id={`pages.${bot.type}.invite`} />
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
