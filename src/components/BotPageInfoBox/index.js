import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Locations from '../../data/Locations';
import Modesta from '../../data/Modesta';
import { fetchAuthIfNeeded } from '../../redux/actions/auth';
import ContentBox from '../ContentBox';
import FlexContainer from '../FlexContainer';
import LazyImage from '../LazyImage';
import styles from './index.module.scss';
import PrefixLabel from './PrefixLabel';

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
      </ContentBox>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(BotPageInfoBox);
