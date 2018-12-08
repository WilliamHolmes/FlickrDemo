import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import Typography from '@material-ui/core/Typography';

import { Strings } from '../constants';

export default class NoResults extends Component {
  render() {
    const { searchTerm } = this.props;
    const noResults = _.template(Strings.templates.NO_RESULTS)({ searchTerm });
    return (
      <div className={'noResultsContainer'}>
        <Typography variant={'h5'} color={'inherit'}>
          {noResults}
        </Typography>
        <Typography variant={'subtitle2'} color={'inherit'}>
          {Strings.templates.SEARCH_AGAIN}
        </Typography>
      </div>
    )
  }
}

NoResults.propTypes = {
  searchTerm: PropTypes.string.isRequired
};
