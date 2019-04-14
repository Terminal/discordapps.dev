import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, RedditIcon, RedditShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import DateFormat from '../../data/DateFormat';
import Locations from '../../data/Locations';
import Modesta from '../../data/Modesta';
import States from '../../data/States';
import ContentBox from '../ContentBox';
import FlexColumns from '../FlexColumns';
import FlexContainer from '../FlexContainer';
import LocalisedHyperlink from '../LocalisedHyperlink';
import styles from './index.module.scss';

// Rest in peace Google+
// :heejintears:

class BotPageLinks extends Component {
  render() {
    const { bot, contents, match } = this.props
    return (
      <ContentBox>
        <FlexContainer className={styles.shareButtons}>
          <FormattedMessage
            id="components.botpagelinks.share"
            values={{
              name: contents.name
            }}
            >
            {share => <>
              <TwitterShareButton
                url={`${Locations.domain}${match.url}`}
                title={share}>
                <TwitterIcon size={32} />
              </TwitterShareButton>
              {/* <GooglePlusShareButton
                url={`${Locations.domain}${match.url}`}>
                <GooglePlusIcon size={32} />
              </GooglePlusShareButton> */}
              <FacebookShareButton
                url={`${Locations.domain}${match.url}`}
                quote={share}>
                <FacebookIcon size={32} />
              </FacebookShareButton>
              <RedditShareButton
                url={`${Locations.domain}${match.url}`}
                title={contents.name}>
                <RedditIcon size={32} />
              </RedditShareButton>
              <EmailShareButton
                url={`${Locations.domain}${match.url}`}
                subject={contents.name}
                body={share}>
                <EmailIcon size={32} />
              </EmailShareButton>
            </>}
          </FormattedMessage>
        </FlexContainer>
        <FlexColumns>
          {
            bot.authors.length > 0 ?
            <FlexColumns columns={6}>
              <p><FormattedMessage id="pages.bots.offeredby"/></p>
              <ul>
                {bot.authors.map((author) => (
                  <li key={author.id}>
                    <LocalisedHyperlink aria-label={`${author.username}#${author.discriminator}`} to="/filter" query={{
                      owners: [author.id],
                      state: States.APPROVED
                    }}>
                      {author.username}#{author.discriminator}
                    </LocalisedHyperlink>
                  </li>
                ))}
              </ul>
            </FlexColumns> :
            <FlexColumns columns={6}>
              <FlexContainer className={Modesta.secondary} style={{margin: '5px', padding: '5px'}}><FormattedMessage id="pages.bots.reclaim"/></FlexContainer>
            </FlexColumns>
          }
          <FlexColumns columns={6}>
            <p>
              <FormattedMessage id="pages.bots.created" values={{
                date: (new Date(bot.created)).toLocaleDateString(this.props.intl.locale, DateFormat)
              }} /><br />
              <FormattedMessage id="pages.bots.modified" values={{
                date: (new Date(bot.edited)).toLocaleDateString(this.props.intl.locale, DateFormat)
              }} />
            </p>
          </FlexColumns>
          {
            bot.category &&
            <FlexColumns columns={6}>
              <FormattedMessage id={`categories.${bot.category}`}>
                {
                  category =>
                  <FormattedMessage id="pages.bots.category" values={{
                    category
                  }} />
                }
              </FormattedMessage>
            </FlexColumns>
          }
          {
            typeof bot.count === 'number' &&
            <FlexColumns columns={6}>
              <p>
                <FormattedMessage id="pages.bots.count" values={{
                  guilds: bot.count
                }}/>
              </p>
            </FlexColumns>
          }
        </FlexColumns>
      </ContentBox>
    )
  }
}

export default injectIntl(BotPageLinks);
