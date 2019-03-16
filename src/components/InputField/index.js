

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import FlexContainer from '../FlexContainer';
import Column from '../Column';
import Modesta from '../../data/Modesta';

class InputField extends Component {
  render() {
    return (
      <Column className={this.props.className || Modesta.oneHalf}>
        <label htmlFor={this.props.name}><FormattedMessage id={`${this.props.id}.title`} /></label>
        <FlexContainer>
          <FormattedMessage id={`${this.props.id}.placeholder`}>
            {placeholder =>
              <input name={this.props.name} type="text" className="full-width" placeholder={placeholder} style={{flexGrow: '1'}}/>
            }
          </FormattedMessage>
        </FlexContainer>
      </Column>
    )
  }
}

export default InputField;
