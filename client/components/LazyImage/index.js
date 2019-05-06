import React, { Component } from 'react';
import styles from './index.module.scss';
import ConstructCSS from '../../helpers/ConstructCSS';

class LazyImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    this.load = this.load.bind(this);
    this.image = React.createRef();
  }
  load() {
    this.setState({
      loaded: true
    });
  }
  render() {
    const loaded = typeof window === 'undefined' || this.state.loaded;
    return (
      <img {...this.props} src={this.props.src} className={ConstructCSS(styles.image, loaded && styles.loaded, this.props.className)} alt={this.props.alt} ref={this.image} onLoad={this.load}></img>
    );
  }
}

export default LazyImage;
