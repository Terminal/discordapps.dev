

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import FlexContainer from '../FlexContainer';
import Column from '../Column';
import Modesta from '../../data/TwitterEmojis';
import elementStyles from '../../scss/elements.module.scss';

class MultipleInputField extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      values: []
    };
  }
  handleChange(e, index) {
    const values = [...this.state.values];
    values[index] = e.target.value;

    this.setState({
      values
    })
  }
  add(e) {
    e.preventDefault();
    this.setState({
      values: [...this.state.values, '']
    })
  }
  remove(e, index) {
    e.preventDefault();
    this.setState({
      values: this.state.values.filter((x, i) => i !== index)
    })
  }
  componentDidUpdate() {
    if (this.state.values.length === 0 && this.props.value && this.props.value.length > 0) {
      this.setState({
        values: this.props.value
      });
    }
  }
  render() {
    let values = this.state.values.slice();

    const input = (value, index) => (
      <FormattedMessage id={`${this.props.id}.placeholder`}>
        {placeholder =>
          <input name={this.props.name} type="text" className={Modesta.fullWidth} placeholder={placeholder} style={{flexGrow: '1'}} value={value || ''} onChange={(e) => {
            this.handleChange(e, index);
            if (this.props.onChange) this.props.onChange(e);
          }}/>
        }
      </FormattedMessage>
    )

    return (
      <Column className={this.props.className || Modesta.oneHalf}>
        <label htmlFor={this.props.name}>
          <FormattedMessage id={`${this.props.id}.title`} />
          {this.props.required ? '*' : null}
        </label>
        <FlexContainer>
          {input(values.shift(), 0)}
          <button className={elementStyles.button} onClick={this.add}>
            <FormattedMessage id={`${this.props.id}.add`} />
          </button> 
        </FlexContainer>
        {
          values.map((value, index) =>
            <FlexContainer key={index}>
              {input(value, index + 1)}
              {
                <button className={elementStyles.button} onClick={(e) => this.remove(e, index + 1)}>
                  <FormattedMessage id={`${this.props.id}.delete`} />
                </button>
              }
            </FlexContainer>
          )
        }
      </Column>
    )
  }
}

export default MultipleInputField;
