import React, { Component } from 'react';
import LoadingLine from './LoadingLine';

class LoadingText extends Component {
  render() {
    const widths = [];
    let lines = this.props.lines || 10;

    for (let i = 0; i < lines; i += 1) {
      widths.push(60 + Math.random() * 40);
    }

    return (
      <div>
        {
          widths.map((width, index) => <LoadingLine key={index} width={width} />)
        }
      </div>
    )
  }
}

export default LoadingText;
