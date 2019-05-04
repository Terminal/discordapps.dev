import React, { Component } from 'react';
import styles from './index.module.scss';
import LazyImage from '../LazyImage';
import elementStyles from '../../scss/elements.module.scss';
import Modesta from '../../data/TwitterEmojis';

class ModalImage extends Component {
  constructor(props) {
    super(props);
    this.image = React.createRef();

    this.state = {
      open: false,
      closing: false
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({
      opened: true
    });
  }

  close() {
    this.setState({
      closing: true
    })
    setTimeout(() => {
      this.setState({
        opened: false,
        closing: false
      });
    }, 575)
  }

  render() {
    return (
      <div>
        <LazyImage src={this.props.src} className={`${this.props.className} ${styles.zoomIn}`} onClick={this.open} />
        {/* <div onClick={this.close} className={`${this.state.closing ? `${styles.modalClose}` : ''}`} style={this.state.opened ? { display: 'block' } : {}}>
          <div className={`${elementStyles.roundedCorners} ${styles.modalContent}`}>
            <LazyImage src={this.props.src} onClick={this.open} className={styles.modalImage} />
          </div>
        </div> */}
      </div>
    );
  }
}

export default ModalImage;
