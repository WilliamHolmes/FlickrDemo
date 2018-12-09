import React, { Component } from 'react';
import classnames from 'classnames';

import Photos from './photos';

import SearchContext from '../context/SearchContext';

export default class PhotosContainer extends Component {
  render() {
    return (
      <SearchContext.Consumer>
        {({ inProgress,  handleScroll }) => {
          const photosClass = classnames('photosContainer', {
            inactive: inProgress
          });
          return (
            <div className={photosClass} onScroll={handleScroll}>
              <Photos />
            </div>
          )
        }}
      </SearchContext.Consumer>
    );
  }
}
