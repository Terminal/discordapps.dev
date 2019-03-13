import React, { Component } from 'react';
import styles from './index.module.scss';

class LazyImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src: null
    };
  }
  componentDidMount() {
    fetch(this.props.src)
      .then(res => res.blob())
      .then((data) => {
        const objectURL = URL.createObjectURL(data);
        this.setState({
          src: objectURL
        });
      })
  }
  render() {
    return (
      <img src={this.state.src} className={`${styles.image} ${this.state.src ? styles.loaded : ''} ${this.props.className}`} alt={this.props.alt}></img>
    )
  }
}

export default LazyImage;
