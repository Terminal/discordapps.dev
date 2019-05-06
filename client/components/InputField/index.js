

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import FlexContainer from '../FlexContainer';
import Column from '../Column';
import Modesta from '../../data/Modesta';
import styles from './index.module.scss';

class InputField extends Component {
  render() {
    let input = null;
    const value = this.props.value;

    if (this.props.options) {
      input = (
        <FormattedMessage id={`${this.props.id}.placeholder`}>
          {placeholder =>
            <select name={this.props.name} className={Modesta.fullWidth} defaultValue={value} onChange={this.props.onChange}>
              <option disabled={!this.props.allowNone} selected={!this.props.options.some(option => value === option)} value="">{placeholder}</option>
              {
                this.props.options.map(option => {
                  if (this.props.localiseOptions) {
                    return (
                      <FormattedMessage id={`${this.props.localiseOptions}.${option}`} key={option}>
                        {formattedOption => <option value={option} selected={value === option}>{formattedOption}</option>}
                      </FormattedMessage>
                    )
                  }
                  return (
                    <option value={option} selected={value === option} key={option}>{option}</option>
                  )
                })
              }
            </select>
          }
        </FormattedMessage>
      )
    } else if (this.props.toggle) {
      input = (
        <input name={this.props.name} type="checkbox" defaultChecked={value} onChange={this.props.onChange} />
      )
    } else if (this.props.textarea) {
      input = (
        <FormattedMessage id={`${this.props.id}.placeholder`}>
          {placeholder =>
            <textarea name={this.props.name} className={`${Modesta.fullWidth} ${styles.textarea}`} placeholder={placeholder} defaultValue={value || undefined} onChange={this.props.onChange} />
          }
        </FormattedMessage>
      )
    } else {
      input = (
        <FormattedMessage id={`${this.props.id}.placeholder`}>
          {placeholder =>
            <input name={this.props.name} type="text" className={Modesta.fullWidth} placeholder={placeholder} style={{flexGrow: '1'}} defaultValue={value || undefined} onChange={this.props.onChange} />
          }
        </FormattedMessage>
      )
    }

    return (
      <Column className={this.props.className || Modesta.oneHalf} style={this.props.style}>
        <label htmlFor={this.props.name}>
          <FormattedMessage id={`${this.props.id}.title`} />
          {this.props.required ? '*' : null}
        </label>
        <FlexContainer>
          {input}
        </FlexContainer>
        {this.props.smallText ? <small><FormattedMessage id={`${this.props.id}.small`} /></small>: null}
      </Column>
    )
  }
}

export default InputField;
