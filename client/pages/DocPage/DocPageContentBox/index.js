import React, { Component } from 'react';
import ContentBox from '../../../components/ContentBox';
import marked from 'marked';
import xss from 'xss';
import arrow from '../../../scss/ModestaCSS/css/images/arrow.png';
import styles from './index.module.scss';
import { FormattedMessage } from 'react-intl';
import Modesta from '../../../data/Modesta';
import elementsStyle from '../../../scss/elements.module.scss';


class BotPageContentBox extends Component {
  render() {
    const page = xss(marked(this.props.page), {
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
