

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import FlexContainer from '../FlexContainer';
import Column from '../Column';
import Modesta from '../../data/Modesta';

class InputField extends Component {
  render() {
    let input = null;
    const value = this.props.value;

    if (this.props.options) {
      input = (
        <FormattedMessage id={`${this.props.id}.placeholder`}>
          {placeholder =>
            <select name={this.props.name} className={Modesta.fullWidth} defaultValue={value}>
              <option disabled selected={!this.props.options.some(option => value === option)}>{placeholder}</option>
              {
                this.props.options.map(option => <option value={option} selected={value === option} key={option}>{option}</option>)
              }
            </select>
          }
        </FormattedMessage>
      )
    } else if (this.props.toggle) {
      input = (
        <input name={this.props.name} type="checkbox" defaultChecked={value} />
      )
    } else {
      input = (
        <FormattedMessage id={`${this.props.id}.placeholder`}>
          {placeholder =>
            <input name={this.props.name} type="text" className={Modesta.fullWidth} placeholder={placeholder} style={{flexGrow: '1'}} defaultValue={value || undefined}/>
          }
        </FormattedMessage>
      )
    }

    return (
      <Column className={this.props.className || Modesta.oneHalf}>
        <label htmlFor={this.props.name}><FormattedMessage id={`${this.props.id}.title`} /></label>
        <FlexContainer>
          {input}
        </FlexContainer>
        {this.props.smallText ? <small><FormattedMessage id={`${this.props.id}.small`} /></small>: null}
      </Column>
    )
  }
}

export default InputField;
