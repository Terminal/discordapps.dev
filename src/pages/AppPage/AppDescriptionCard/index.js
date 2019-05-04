import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import Locations from '../../../data/Locations';
import Modesta from '../../../data/TwitterEmojis';
import ContentBox from '../../../components/ContentBox';
import FlexContainer from '../../../components/FlexContainer';
import LazyImage from '../../../components/LazyImage';
import styles from './index.module.scss';
import PrefixLabel from './PrefixLabel';

class AppDescriptionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sure: false,
      deleted: false
    }

    this.openSure = this.openSure.bind(this);
    this.delete = this.delete.bind(this);
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

    const { app, contents } = this.props;
    return (
      <ContentBox>
        <FlexContainer>
          <div>
            <LazyImage src={`${Locations.cdn}${app.cachedImages.avatar}`} className={styles.avatar} />
          </div>
          <div>
            <h3>
              {contents.name}
            </h3>
            <p>
              {contents.description}
            </p>
            <p>
              {app.nsfw ? <>
                <PrefixLabel className={Modesta.alizarin}><FormattedMessage id="pages.bots.nsfw" /></PrefixLabel>
              </> : null}
              {app.state !== 'approved' ? <>
                <PrefixLabel className={Modesta.alizarin}><FormattedMessage id={`states.${app.state}`} /></PrefixLabel>
              </> : null}
            </p>
          </div>
        </FlexContainer>
        {
          app.flags && app.flags.adverts ?
            <div>
              <FormattedMessage id="pages.bots.adverts" />
            </div> :
            null
        }
        {
          app.flags && app.flags.inAppPurchases ?
            <div>
              <FormattedMessage id="pages.bots.inAppPurchases" />
            </div> :
            null
        }
      </ContentBox>
    )
  }
}

export default AppDescriptionCard;
