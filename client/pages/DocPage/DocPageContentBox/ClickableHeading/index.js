import React, { Component, createElement } from 'react';
import { Modesta, TwitterEmojis } from '../../../../data/Styles';
import FlexContainer from '../../../../components/FlexContainer';
import ConstructCSS from '../../../../helpers/ConstructCSS';
import styles from './index.module.scss';
import { createToast } from '../../../../redux/actions/toasts';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Locations from '../../../../data/Locations';

class ClickableHeading extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this);
    this.input = React.createRef();
    this.header = React.createRef();
  }
  componentDidMount() {
    if (window.location.hash === `#${this.props.id}`) window.scrollTo(0, this.header.current.offsetTop);
  }
  onClick(e, copied) {
    window.scrollTo(0, this.header.current.offsetTop);

    const { dispatch } = this.props;
    dispatch(createToast({
      content: copied,
      timeout: 3000
    }))

    this.input.current.select();
    document.execCommand('copy');
  }
  render() {
    return <>
      <FormattedMessage id="pages.docs.copy">
        {copy => 
          <FormattedMessage id="pages.docs.copied">
            {
              copied =>
                createElement(this.props.tag, {
                  children: this.props.children,
                  className: ConstructCSS(Modesta.tooltip, styles.heading),
                  'data-tooltip': copy,
                  id: this.props.id,
                  ref: this.header,
                  onClick: (e) => this.onClick(e, copied)
                })
            }
          </FormattedMessage>
        }
      </FormattedMessage>
      <input readOnly value={`${typeof window !== 'undefined' ? window.location.origin : Locations.domain}${this.props.location.pathname}#${this.props.id}`} ref={this.input} className={styles.hidden} />
    </>
  }
}

export default connect()(ClickableHeading);
