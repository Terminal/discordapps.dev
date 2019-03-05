import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class AuthenticateCallback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false
    }
  }
  componentDidMount() {
    if (this.props.location.search) {
      fetch(`https://ls.terminal.ink/auth/callback${this.props.location.search}`, {
        credentials: 'include'
      })
        .then(() => {
          this.setState({
            done: true
          })
        })
    }
  }
  render() {
    if (this.state.done) {
      return (<Redirect to="/" />)
    } else {
      return (
        <p>please wait</p>
      )
    }
  }
}

export default AuthenticateCallback;
