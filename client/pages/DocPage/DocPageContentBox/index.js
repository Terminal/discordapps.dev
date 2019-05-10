import hljs from 'highlight.js/lib/highlight';
import hljsJavascript from 'highlight.js/lib/languages/javascript';
import hljsBash from 'highlight.js/lib/languages/bash';
import hljsDiff from 'highlight.js/lib/languages/diff';
import marksy from 'marksy/jsx';
import React, { Component, createElement } from 'react';
import ContentBox from '../../../components/ContentBox';
import LazyImage from '../../../components/LazyImage';
import Locations from '../../../data/Locations';
import styles from './index.module.scss';
import 'highlight.js/styles/vs2015.css';
import TableContainer from '../../../components/TableContainer';
import ModalImage from '../../../components/ModalImage';

hljs.registerLanguage('javascript', hljsJavascript);
hljs.registerLanguage('bash', hljsBash);
hljs.registerLanguage('diff', hljsDiff);

class BotPageContentBox extends Component {
  constructor(props) {
    super(props);

    this.textArea = React.createRef();
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    if (e.target) {
      let tag = null;

      // whoops
      if (/h[1-6]/i.test(e.target.tagName)) tag = e.target;
      if (/h[1-6]/i.test(e.target.parentElement.tagName)) tag = e.target.parentElement;
      if (/h[1-6]/i.test(e.target.parentElement.parentElement.tagName)) tag = e.target.parentElement.parentElement;

      if (tag) {
        this.textArea.current.value = `${window.location.origin}${window.location.pathname}#${tag.attributes.id.value}`;
        this.textArea.current.select();
        document.execCommand('copy');
       
        const element = document.getElementById(tag.attributes.id.value)
        if (element) {
          window.scrollTo(0, element.offsetTop);
        }
      }
    }
  }
  render() {
    const page = this.props.page;

    const compiler = marksy({
      createElement,
      elements: {
        img: ({src, alt}) => <ModalImage className={styles.img} src={src.startsWith('http') ? src : `${Locations.docsServer}/posts${this.props.requestURL}${src}`} alt={alt} title={alt}/>,
        table: ({children}) => <TableContainer><table>{children}</table></TableContainer>
      },
      highlight: (language, code) => hljs.highlight(language, code).value
    });

    const compiled = compiler(page);

    console.log(compiled);

    return (
      <ContentBox>
        <div>
          <div
            ref={this.description}
            className={styles.description}
            onClick={this.onClick}
          >
            {compiled.tree}
          </div>
        </div>
        <textarea ref={this.textArea} className={styles.hidden}></textarea>
      </ContentBox>
    )
  }
}

export default BotPageContentBox;
