import React from 'react';
import PropTypes from 'prop-types';
import Global from '../components/Global';
import SiteLayout from '../components/SiteLayout';
import { FormattedMessage } from 'react-intl';

class NotFoundPage extends React.Component {
  render() {
    return (
      <SiteLayout type="bots">
        <Global />
        <p>Rarr</p>
      </SiteLayout>
    );
  }
}

NotFoundPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
};

export default NotFoundPage;
