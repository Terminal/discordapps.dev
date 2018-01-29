import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

@connect(
	state => ({ locale: state.locale }),
	null,
)
export default class LocaleWrapper extends React.Component {
	render() {
		return <IntlProvider locale={this.props.locale || 'en'}>
			{this.props.children}
		</IntlProvider>;
	}
};
