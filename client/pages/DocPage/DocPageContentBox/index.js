import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import xss from 'xss';
import ContentBox from '../../../components/ContentBox';
import { Modesta, RougeHighlight } from '../../../data/Styles';
import elementsStyle from '../../../scss/elements.module.scss';
import arrow from '../../../scss/ModestaCSS/css/images/arrow.png';
import styles from './index.module.scss';

class BotPageContentBox extends Component {
  render() {
    const page = xss(this.props.page.replace(/x-ls-newline/g, '\\n'), {
      whiteList: null,
      onTag: (tag, html, options) => {
        if (tag === 'table') {
          if (options.isClosing) {
            return '</table></div>'
          }
          return `<div class="${Modesta.tableContainer} ${styles.tableContainer} ${elementsStyle.scrollbar}">${html}`
        }

        return;
      },
      onTagAttr: (tag, name, value, isWhiteAttr) => {
        if (tag === 'img' && name === 'src' && this.props.cdn && value.startsWith('/')) {
          return `src="${this.props.cdn}${value}"`
        }

        if (name === 'class') {
          // Replace any class with Rogue highlight class
          // Part of Jekyll
          const classes = value.split(' ')
            .map(className => RougeHighlight[className])
            .filter(className => className);

          if (classes.length) return `class="${classes}"`
        }

        return;
      },
      onIgnoreTagAttr: (tag, name, value, isWhiteAttr) => {
        if (this.props.allowHTML || name === 'class') {
          return `${name}="${xss.escapeAttrValue(value)}"`
        }
      }
    });

    const smallEnough = typeof this.props.forceLarge === 'boolean' ? this.props.forceLarge : this.state.smallEnough;

    return (
      <ContentBox>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: page
            }}
            ref={this.description}
            className={styles.description}
          ></div>
          {smallEnough ? null : // if not small enough, show the buttons
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
