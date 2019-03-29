import React, { Component } from 'react';
import styles from './index.module.scss';

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
    console.log(this.state.loaded)
    return (
      <img {...this.props} src={this.props.src} className={`${styles.image} ${this.state.loaded && styles.loaded} ${this.props.className}`} alt={this.props.alt} ref={this.image} onLoad={this.load}></img>
    );
  }
}

export default LazyImage;
