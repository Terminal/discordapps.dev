import { React, Component } from 'react';
import { Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class EditPage extends Component {
  render() {
    return (
      <Col xs={12}>
        <form>
          <FormGroup>
            <ControlLabel>ID</ControlLabel>
            <FormControl
              type="text"
              value={this.state.bot.id}
              placeholder="Insert bot ID"
            />
          </FormGroup>
        </form>
      </Col>
    );
  }
}
