import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ContentBox from '../../../components/ContentBox';
import FlexContainer from '../../../components/FlexContainer';
import LazyImage from '../../../components/LazyImage';
import Locations from '../../../data/Locations';
import Modesta from '../../../data/Modesta';
import styles from './index.module.scss';
import PrefixLabel from './PrefixLabel';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import AppPageInviteButton from '../AppPageInviteButton';

class AppPageTitleBox extends Component {
  constructor(props) {
    super(props);

    this.scroll = this.scroll.bind(this);
    this.state = {
      padding: 50,
      maxHeight: 200
    }
  }
  componentDidMount() {
    document.addEventListener('scroll', this.scroll);
  }
  componentWillUnmount() {
    document.removeEventListener('resize', this.scroll);
  }
  scroll(e) {
    const heightthing = (100 - window.scrollY) / 2;
    const maxHeight = (200 - window.scrollY);
    this.setState({
      padding: `${(heightthing > 0 ? heightthing : 0)}px`,
      maxHeight: `${maxHeight > 50 ? maxHeight : 50}px`
    })
  }
  render() {
    const { app, contents } = this.props;
    return (
      <ContentBox className={styles.box} style={{
        paddingTop: this.state.padding,
        paddingBottom: this.state.padding,
        maxHeight: this.state.maxHeight
      }}>
        <Container className={styles.container}>
          <FlexContainer>
            <LazyImage
              src={`${Locations.cdn}${app.cachedImages.avatar}`}
              className={styles.avatar}
              style={{
                maxHeight: this.state.maxHeight
              }} />
            <div className={styles.titleContainer}>
              <h3>
                {contents.name}
              </h3>
            </div>
          </FlexContainer>
          {
            app.nsfw || app.state !== 'approved' ?
            <p>
              {app.nsfw ? <>
                <PrefixLabel className={Modesta.alizarin}><FormattedMessage id="pages.bots.nsfw" /></PrefixLabel>
              </> : null}
              {app.state !== 'approved' ? <>
                <PrefixLabel className={Modesta.alizarin}><FormattedMessage id={`states.${app.state}`} /></PrefixLabel>
              </> : null}
            </p> :
            null
          }
          {
            app.flags && app.flags.adverts &&
              <div>
                <FormattedMessage id="pages.bots.adverts" />
              </div>
          }
          {
            app.flags && app.flags.inAppPurchases &&
              <div>
                <FormattedMessage id="pages.bots.inAppPurchases" />
              </div>
          }
        </Container>
      </ContentBox>
    )
  }
}

export default AppPageTitleBox;
