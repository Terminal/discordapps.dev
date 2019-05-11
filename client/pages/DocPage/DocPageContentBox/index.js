import hljs from 'highlight.js/lib/highlight';
import hljsBash from 'highlight.js/lib/languages/bash';
import hljsDiff from 'highlight.js/lib/languages/diff';
import hljsJavascript from 'highlight.js/lib/languages/javascript';
import hljsJson from 'highlight.js/lib/languages/json';
import marksy from 'marksy/jsx';
import React, { Component, createElement } from 'react';
import ContentBox from '../../../components/ContentBox';
import ModalImage from '../../../components/ModalImage';
import TableContainer from '../../../components/TableContainer';
import Locations from '../../../data/Locations';
import styles from './index.module.scss';
import './vs2015.scss';
import ClickableHeading from './ClickableHeading';

hljs.registerLanguage('javascript', hljsJavascript);
hljs.registerLanguage('bash', hljsBash);
hljs.registerLanguage('diff', hljsDiff);
hljs.registerLanguage('json5', hljsJavascript);
hljs.registerLanguage('json', hljsJson);

class BotPageContentBox extends Component {
  render() {
    const page = this.props.page;

    const compiler = marksy({
      createElement,
      elements: {
        img: ({src, alt}) => <ModalImage className={styles.img} src={src.startsWith('http') ? src : `${Locations.docsServer}/posts${this.props.requestURL}/${src}`} alt={alt} title={alt}/>,
        table: ({children}) => <TableContainer><table>{children}</table></TableContainer>,
        h1: ({children, id}) => <ClickableHeading tag="h1" id={id} match={this.props.match} location={this.props.location}>{children}</ClickableHeading>,
        h2: ({children, id}) => <ClickableHeading tag="h2" id={id} match={this.props.match} location={this.props.location}>{children}</ClickableHeading>,
        h3: ({children, id}) => <ClickableHeading tag="h3" id={id} match={this.props.match} location={this.props.location}>{children}</ClickableHeading>,
        h4: ({children, id}) => <ClickableHeading tag="h4" id={id} match={this.props.match} location={this.props.location}>{children}</ClickableHeading>,
        h5: ({children, id}) => <ClickableHeading tag="h5" id={id} match={this.props.match} location={this.props.location}>{children}</ClickableHeading>,
        h6: ({children, id}) => <ClickableHeading tag="h6" id={id} match={this.props.match} location={this.props.location}>{children}</ClickableHeading>,
      },
      highlight: (language, code) => hljs.highlight(language, code).value
    });

    const compiled = compiler(page);

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
      </ContentBox>
    )
  }
}

export default BotPageContentBox;
