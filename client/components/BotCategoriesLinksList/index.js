import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import States from '../../../data/States';
import ContentBox from '../ContentBox';
import LocalisedHyperlink from '../LocalisedHyperlink';
import styles from './index.module.scss';
import Categories from '../../../data/Categories';

class CategoriesLinksList extends Component {
  render() {
    return (
      <ContentBox>
        <h5>
          <FormattedMessage id="pages.bots.initiateCategoryFilter" />
        </h5>
        <ul className={styles.list}>
          {
            Categories.map((x) => (
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
      </ContentBox>
    )
  }
}


export default CategoriesLinksList;
