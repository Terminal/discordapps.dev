import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './../components/Carousel';
import CarouselCard from './../components/CarouselCard';
import { FormattedMessage } from 'react-intl';
import LocalLink from './../components/LocalLink';
import { ItemPropType } from './../proptypes';
import Card from './../components/Card';
import Cards from './../components/Cards';
import Global from './../components/Global';
import SiteLayout from './../components/SiteLayout';
import { graphql } from 'gatsby';

export default class Homepage extends React.Component {
  render() {

    return (
      <SiteLayout locale={this.props.pageContext.locale} type="bots">
        <Global />
        <p>Hello world!</p>
      </SiteLayout>
    );
  }
}
