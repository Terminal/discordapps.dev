import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import Locations from '../../data/Locations';
import { Modesta } from '../../data/Styles';
import YouTube from '../YouTube';

class WereNotReadyToGoLiveBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: null
    }
  }
  componentDidMount() {
    const videos = [
      /**
       * loonatheworld
       */
      '-FCYE87P5L0', // ViViD
      'ePFojB292-Q', // Around You
      'pKybkK2gj1U', // I'll Be There
      '6a4BWpBJppI', // Let Me In
      'WX-lpEnIQQk', // The Carol
      'thpTOAS1Vgg', // Kiss Later
      'wUBrO83fTbY', // My Melody
      'TtaDrUbsO30', // My Sunday
      'ZNcBZM5SvbY', // Everyday I Love You (Feat. HaSeul)
      '4K4b9Z9lSwc', // Love&Live
      '2_r4kDUzslg', // You and Me Together
      'a6JmCdDs_GM', // Sonatine
      'yphYFDJ4J4w', // Everyday I Need You (Feat. JinSoul)
      '_qJEoSa3Ie0', // Eclipse
      'RWeyOyY_puQ', // Singing in the Rain
      'VBbeuXW8Nko', // Love Cherry Motio
      'XznW8Ti6WWk', // LOOANTIC
      'LIDe-yTxda0', // new
      'BVVfMFS3mgc', // Heart Attack
      'm5qwcYL8a0o', // One&Only
      'UkY8HvgvBJ8', // Egoist (Feat. JinSoul)
      'tIWpr3tHzII', // love4eva (feat. Grimes)
      'AFJPFfnzZ7w', // favOriTe
      '846cjX0ZTrk', // Hi High
      'XEOCbFJjRw0', // Butterfly
      /**
       * Not loonatheworld
       */
      'D2MhwXZ8IgM', // APRIL - Oh! my mistake
      'f5RHf916uDU', // GWSN - Pinky Star
      '5LCGn9UFNAY', // Cherry Bullet - Q&A
    ]
    this.setState({
      video: videos[Math.floor(videos.length * Math.random())]
    })
  }
  render() {
    return (
      <ContentBox className={`${Modesta.alizarin} ${Modesta.whiteText}`}>
        <p>
          This community developed edition of the <b>Terminal.ink Bot List and Application Marketplace</b> is not ready for production.<br />
          <a className={`${Modesta.btn} ${Modesta.asbestos}`} href={Locations.server}>Main website</a><br />
          <a className={`${Modesta.btn} ${Modesta.asbestos}`} href={Locations.sourceCode}>Development Source Code @ GitHub</a>
        </p>
        {this.state.video ? <YouTube video={this.state.video} /> : null}
      </ContentBox>
    )
  }
}

export default WereNotReadyToGoLiveBox;
