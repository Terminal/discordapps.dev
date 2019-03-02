import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import styles from './index.module.scss';
import LoadingText from '../LoadingText';
import LocalisedHyperlink from '../LocalisedHyperlink';
import { fetchCategoriesIfNeeded } from '../../redux/actions/categories';

class CategoriesLinksList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
  }
  render() {
    const categories = this.props.categories.data
    return (
      <ContentBox>
        <h4>
          <FormattedMessage id="pages.bots.initiateCategoryFilter" />
        </h4>
        {
          categories.length === 0 ?
          <LoadingText /> :
          <ul className={styles.list}>
            {
              categories.map((x) => (
                <li key={x} className={styles.item}>
                  <LocalisedHyperlink to={"/bots"} query={{ category: x }}>
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
