import React, { Component } from 'react';
import styles from './index.module.scss';
import ConstructCSS from '../../helpers/ConstructCSS';

class YouTube extends Component {
  render() {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${this.props.video}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={ConstructCSS(styles.video, this.props.className)}
        title={this.props.title}
      ></iframe>
    )
  }
}

export default YouTube;
