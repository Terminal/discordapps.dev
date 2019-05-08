import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentBox from '../../../components/ContentBox';
import InputField from '../../../components/InputField';
import States from '../../../data/States';
import { Modesta } from '../../../data/Styles';
import { FormattedMessage } from 'react-intl';
import Locations from '../../../data/Locations';

class AppPageSetStateBox extends Component {
  constructor(props) {
    super(props);

    this.form = React.createRef();
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    e.preventDefault();
    
    const formdata = new FormData(this.form.current);
    fetch(`${Locations.server}/reactjs/v2/apps/id/${this.props.app.id}/state`, {
      method: 'POST',
      body: formdata,
      credentials: 'include'
    })
  }
  render() {
    const auth = this.props.auth.data;
    const { app } = this.props;

    if (!auth) return null;
    if (!auth.admin) return null;

    return (
      <ContentBox>
        <form ref={this.form}>
          <InputField name="state" id="components.botpagesetstatebox.state" localiseOptions="states" options={Object.values(States)} value={app.state} onChange={this.onChange}/>
          <InputField name="reason" id="components.botpagesetstatebox.reason" textarea={true} className={Modesta.fullWidth} />
          <button onClick={this.submit}><FormattedMessage id="components.botpagesetstatebox.submit" /></button>
        </form>
      </ContentBox>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(AppPageSetStateBox);
