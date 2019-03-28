import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import marked from 'marked';
import xss from 'xss';
import arrow from '../../ModestaCSS/css/images/arrow.png';
import styles from './index.module.scss';
import { FormattedMessage } from 'react-intl';
import Modesta from '../../data/Modesta';
import elementsStyle from '../../scss/elements.module.scss';

class BotPageContentBox extends Component {
  constructor(props) {
    super(props);

    this.button = React.createRef();
    this.description = React.createRef();

    this.state = {
      open: false,
      smallEnough: true
    };

    this.toggle = this.toggle.bind(this);
    this.getExtendedHeight = this.getExtendedHeight.bind(this);
  }

  escape(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  getExtendedHeight = () => [...this.description.current.children]
    .map((elem) => {
      const height = elem.clientHeight;
      let topMargin = 2;
      let bottomMargin = 2;

      try {
        topMargin = parseInt(document.defaultView.getComputedStyle(elem, '').getPropertyValue('margin-top'), 10);
        bottomMargin = parseInt(document.defaultView.getComputedStyle(elem, '').getPropertyValue('margin-bottom'), 10);
      } catch (e) {
        // Do nothing!
        // Just use the default margin sizes.
      }

      return topMargin + height + bottomMargin;
    })
    .reduce((prev, curr) => prev + curr, 0);

  toggle() {
    if (this.state.open === true) {
      this.description.current.style.height = '200px';
    } else {
      this.description.current.style.height = `${this.getExtendedHeight()}px`;
    }

    this.setState({
      open: !this.state.open
    });
  }

  componentDidMount() {
    // If the description's size is greater than 300, display the button
    // Otherwise, just display the entire description
    if (this.getExtendedHeight() > 300) {
      this.setState({
        smallEnough: false
      });
    }
  }

  render() {
    const page = xss(marked(this.props.page), {
      whiteList: {
        p: [],
        span: [],
        code: [],
        b: [],
        i: [],
        u: [],
        li: [],
        ul: [],
        ol: [],
        del: [],
        pre: [],
        strong: [],
        em: [],
        h1: ['id'],
        h2: ['id'],
        h3: ['id'],
        h4: ['id'],
        h5: ['id'],
        h6: ['id'],
        table: [],
        thead: [],
        tbody: [],
        tr: [],
        th: [],
        td: [],
        hr: [],
        blockquote: [],
        br: [],
        a: ['href']
      },
      onIgnoreTag: (tag, html, options) => {
        let extraNotes = '';

        switch(tag) {
          case 'img':
            extraNotes = 'You should instead use the "preview images", found in the Appearance section of the edit page of your bot, or adopt the use of emojis.';
            break;
          case 'script':
            extraNotes = 'You are too dangerous to use this tag!';
            break;
          case 'loona':
            extraNotes = '<3 ily!!!!!';
            break;
          default:
            extraNotes = 'Please adopt a tag which is allowed, or restrict yourself to Markdown only.'
        }

        if (typeof window !== 'undefined') console.error(`The <${tag}> tag is not allowed in the long description box.\n${extraNotes}`);
        return '';
      },
      onTag: (tag, html, options) => {
        if (tag === 'table') {
          if (options.isClosing) {
            return '</table></div>'
          }
          return `<div class="${Modesta.tableContainer} ${styles.tableContainer} ${elementsStyle.scrollbar}">${html}`
        }

        return;
      }
    });

    return (
      <ContentBox>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: page
            }}
            ref={this.description}
            style={this.state.smallEnough ? {} : { // if not small enough, set default height to 200
              height: '200px',
              transition: `height ${Math.ceil(this.getExtendedHeight() / 200) / 20}s`
            }}
            className={styles.description}
          ></div>
          {this.state.smallEnough ? null : // if not small enough, show the buttons
            <div ref={this.button} onClick={this.toggle}>
              { this.state.open === false ?
                <ContentBox className={`${Modesta.secondary} ${styles.button}`}>
                  <p><FormattedMessage id="components.botpagecontentbox.more" /></p>
                  <FormattedMessage id="components.botpagecontentbox.toggle">
                    {message => <img className={styles.arrow} src={arrow} alt={message}/>}
                  </FormattedMessage>
                </ContentBox> :
                <ContentBox className={`${Modesta.secondary} ${styles.button}`}>
                  <p><FormattedMessage id="components.botpagecontentbox.less" /></p>
                  <FormattedMessage id="components.botpagecontentbox.toggle">
                    {message => <img className={`${styles.arrow} ${styles.upsidedown}`} src={arrow} alt={message}/>}
                  </FormattedMessage>
                </ContentBox>
              }
            </div>
          }
        </div>
      </ContentBox>
    )
  }
}

export default BotPageContentBox;
