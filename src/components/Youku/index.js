import React, { Component } from 'react';
import styles from './index.module.scss';

class Youku extends Component {
  render() {
    return (
      <iframe
        src={`http://player.youku.com/embed/${this.props.video}`}
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.video}
        title={this.props.title}
      ></iframe>
    )
  }
}

export default Youku;
