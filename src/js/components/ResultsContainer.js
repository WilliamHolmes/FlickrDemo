import React, { Component } from 'react';
import _ from 'underscore';

import { CircularProgress } from '@material-ui/core';

import SearchContext from '../context/SearchContext';

import PhotosContainer from './PhotosContainer';
import NoResults from './NoResults';

import FlickrLogo from '../../img/FlickrLogo.svg';

export default class ResultsContainer extends Component {
  render() {
    return (
      <SearchContext.Consumer>
        {({ searchTerm, allPhotos, inProgress }) => {
          if (searchTerm) {
            if (_.isEmpty(allPhotos)) {
              if (inProgress) {
                return <CircularProgress disableShrink className={'loadingSpinner'}/>;
              } else {
                return <NoResults searchTerm={searchTerm} />;
              }
            }
            return <PhotosContainer />;
          }
          return <FlickrLogo className={'landingImage'} />
        }}
      </SearchContext.Consumer>
    );
  }
}
