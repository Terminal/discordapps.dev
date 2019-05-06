import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ContentBox from '../../../components/ContentBox';
import Locations from '../../../data/Locations';
import { fetchAuthIfNeeded } from '../../../redux/actions/auth';
import styles from './index.module.scss';
import LocalisedHyperlink from '../../../components/LocalisedHyperlink';
import States from '../../../data/States';
import DateFormat from '../../../data/DateFormat';
import AppPageDeleteButton from '../AppPageDeleteButton';

class AppPageInfoBox extends Component {
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

    const { app, auth } = this.props;
    return (
      <ContentBox>
        {
          app.trigger &&
          <p>
            <FormattedMessage id="pages.bots.prefix" values={{
              count: app.trigger.prefix.length
            }} />
            <ul className={styles.prefixList}>
              {app.trigger.prefix.map((prefix, index) => <li key={index} className={styles.prefix}>{prefix}</li>)}
              {app.trigger.customisable ? <li className={styles.triggerNote}><FormattedMessage id="pages.bots.customisable" /></li> : null}
              {app.trigger.mentionable ? <li className={styles.triggerNote}><FormattedMessage id="pages.bots.mentionable" /></li> : null}
            </ul>
          </p>
        }
        {
          app.support || app.website || (app.github && app.github.owner && app.github.repo) ?
          <p>
            <FormattedMessage id={`pages.apps.appLinks`} />
            <ul className={styles.appLinks}>
              {app.support ? <li><a href={app.support}><FormattedMessage id="pages.bots.support" /></a></li> : null}
              {app.website ? <li><a href={app.website}><FormattedMessage id="pages.bots.website" /></a></li> : null}
              {app.github && app.github.owner && app.github.repo ? <li><a href={`https://github.com/${app.github.owner}/${app.github.repo}`}><FormattedMessage id="pages.bots.github" /></a></li> : null}
            </ul>
          </p> :
          null
        }
        { auth && (auth.admin || app.authors.some(author => author.id === auth.id)) ?
          <p>
            <FormattedMessage id={`pages.apps.devLinks`} />
            <ul className={styles.appLinks}>
              <li><LocalisedHyperlink to={`/${app.type}/${app.id}/edit`}><FormattedMessage id={`pages.${app.type}.edit`} /></LocalisedHyperlink></li>
              <li>
                <AppPageDeleteButton app={app} />
              </li>
              <li><LocalisedHyperlink to={`/${app.type}/${app.id}/configure`}><FormattedMessage id="pages.bots.configure" /></LocalisedHyperlink></li>
            </ul>
          </p>
          : null
        }
        <p>
          <FormattedMessage id="pages.bots.offeredby"/>
          <ul className={styles.appLinks}>
            {
              app.authors.length ?
                app.authors.map((author) => (
                <li key={author.id}>
                  <LocalisedHyperlink aria-label={`${author.username}#${author.discriminator}`} to="/filter" query={{
                    owners: [author.id],
                    state: States.APPROVED
                  }}>
                    {
                      author.username ?
                      `${author.username}#${author.discriminator}` :
                      author.id
                    }
                  </LocalisedHyperlink>
                </li>
              )) :
              <li>
                <i>
                  <FormattedMessage id="pages.apps.reclaim" />
                </i>
              </li>
            }
          </ul>
        </p>
        {
          app.category &&
          <p>
            <FormattedMessage id="pages.bots.category"/>
            <ul className={styles.appLinks}>
              <li>
                <LocalisedHyperlink to="/filter" query={{
                  category: app.category,
                  state: States.APPROVED
                }}>
                  <FormattedMessage id={`categories.${app.category}`} />
                </LocalisedHyperlink>
              </li>
            </ul>
          </p>
        }
        {
          app.count &&
          <p>
            <FormattedMessage id="pages.bots.count" values={{
              guilds: app.count
            }}/>
          </p>
        }
        <p>
          <FormattedMessage id="pages.bots.created" />
          <ul className={styles.appLinks}>
            <li>{(new Date(app.created)).toLocaleDateString(this.props.intl.locale, DateFormat)}</li>
          </ul>
        </p>
        <p>
          <FormattedMessage id="pages.bots.modified" />
          <ul className={styles.appLinks}>
            <li>{(new Date(app.edited)).toLocaleDateString(this.props.intl.locale, DateFormat)}</li>
          </ul>
        </p>
      </ContentBox>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(injectIntl(AppPageInfoBox));

