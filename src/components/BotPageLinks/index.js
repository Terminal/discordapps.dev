import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import FlexColumns from '../FlexColumns';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import DateFormat from '../../data/DateFormat';
import LocalisedHyperlink from '../LocalisedHyperlink';
import States from '../../data/States';

class BotPageLinks extends Component {
  render() {
    const { bot } = this.props
    return (
      <ContentBox>
        <FlexColumns>
          <FlexColumns columns={6}>
          <p><FormattedMessage id="pages.bots.offeredby"/></p>
          <ul>
            {bot.authors.map((author) => (
              <li key={author.id}>
                <LocalisedHyperlink aria-label={`${author.username}#${author.discriminator}`} to="/bots/filter" query={{
                  owners: [author.id],
                  state: States.APPROVED
                }}>
                  {author.username}#{author.discriminator}
                </LocalisedHyperlink>
              </li>
            ))}
          </ul>
          </FlexColumns>
          <FlexColumns columns={6}>
            <p>
              <FormattedMessage id="pages.bots.created" values={{
                date: (new Date(bot.edited)).toLocaleDateString(this.props.intl.locale, DateFormat)
              }} /><br />
              <FormattedMessage id="pages.bots.modified" values={{
                date: (new Date(bot.edited)).toLocaleDateString(this.props.intl.locale, DateFormat)
              }} />
            </p>
          </FlexColumns>
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
          {
            bot.count ?
            <FlexColumns columns={6}>
              <p>
                <FormattedMessage id="pages.bots.count" values={{
                  guilds: bot.count
                }}/>
              </p>
            </FlexColumns> :
            null
          }
        </FlexColumns>
      </ContentBox>
    )
  }
}

export default injectIntl(BotPageLinks);
