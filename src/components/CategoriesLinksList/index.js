import React, { Component } from 'react';
import ContentBox from '../ContentBox';
import { FormattedMessage } from 'react-intl';

import styles from './index.module.scss';
import LoadingText from '../LoadingText';

class CategoriesLinksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    fetch('https://ls.terminal.ink/api/v2/categories')
      .then(res => res.json())
      .then(data => this.setState({
          categories: data.data
      }));
  }
  render() {
    return (
      <ContentBox>
        <h4>
          <FormattedMessage id="pages.bots.initiateCategoryFilter" />
        </h4>
        {
          this.state.categories.length === 0 ?
          <LoadingText /> :
          <ul className={styles.list}>
            {
              this.state.categories.map((x) => (
                <li key={x} className={styles.item}>
                  <FormattedMessage id={`categories.${x}`} />
                </li>
              ))
            }
          </ul>
        }
      </ContentBox>
    )
  }
}

export default CategoriesLinksList;
