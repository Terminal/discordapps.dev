import React, { Component } from 'react';

class FlexContainer extends Component {
  render() {
    return (
      <div style={{display: 'flex'}} {...this.props}>
        {this.props.children}
      </div>
    )
  }
}

export default FlexContainer;
