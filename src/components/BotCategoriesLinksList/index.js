import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import styles from './index.module.scss';
import LoadingText from '../LoadingText';
import LocalisedHyperlink from '../LocalisedHyperlink';
import { fetchCategoriesIfNeeded } from '../../redux/actions/categories';
import States from '../../data/States';

class CategoriesLinksList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
  }
  render() {
    const categories = this.props.categories.data
    return (
      <ContentBox>
        <h5>
          <FormattedMessage id="pages.bots.initiateCategoryFilter" />
        </h5>
        {
          categories.length === 0 ?
          <LoadingText /> :
          <ul className={styles.list}>
            {
              categories.map((x) => (
                <li key={x} className={styles.item}>
                  <LocalisedHyperlink to="/filter" query={{
                    category: x,
                    state: States.APPROVED
                  }}>
                    <FormattedMessage id={`categories.${x}`} />
                  </LocalisedHyperlink>
                </li>
              ))
            }
          </ul>
        }
      </ContentBox>
    )
  }
}

const mapStateToProps = (state) => {
  const { categories } = state;
  return { categories };
}

export default connect(mapStateToProps)(CategoriesLinksList);
