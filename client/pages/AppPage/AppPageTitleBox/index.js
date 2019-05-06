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

class AppPageTitleBox extends Component {
  constructor(props) {
    super(props);

    this.scroll = this.scroll.bind(this);
    this.state = {
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
    // console.log(e);
    console.log(window.scrollY);
    const heightthing = (100 - window.scrollY) / 2
    this.setState({
      padding: `${(heightthing > 0 ? heightthing : 0)}px`
    })
  }
  render() {
    const { bot, contents } = this.props;
    return (
      <ContentBox className={styles.box} style={{paddingTop: this.state.padding, paddingBottom: this.state.padding}}>
        <Container className={styles.container}>
          <FlexContainer>
            <LazyImage src={`${Locations.cdn}${bot.cachedImages.avatar}`} className={styles.avatar} />
            <div>
              <h3>
                {contents.name}
              </h3>
              <p>
                {contents.description}
              </p>
              {
                bot.nsfw || bot.state !== 'approved' ?
                <p>
                  {bot.nsfw ? <>
                    <PrefixLabel className={Modesta.alizarin}><FormattedMessage id="pages.bots.nsfw" /></PrefixLabel>
                  </> : null}
                  {bot.state !== 'approved' ? <>
                    <PrefixLabel className={Modesta.alizarin}><FormattedMessage id={`states.${bot.state}`} /></PrefixLabel>
                  </> : null}
                </p> :
                null
              }
            </div>
          </FlexContainer>
          {
            bot.flags && bot.flags.adverts &&
              <div>
                <FormattedMessage id="pages.bots.adverts" />
              </div>
          }
          {
            bot.flags && bot.flags.inAppPurchases &&
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
