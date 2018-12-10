import React, { Component } from 'react';
import classnames from 'classnames';

import Photos from './photos';

import SearchContext from '_context/SearchContext';

export default class PhotosContainer extends Component {
  render() {
    return (
      <SearchContext.Consumer>
        {({ inProgress }) => {
          const photosClass = classnames('photosContainer', {
            inactive: inProgress
          });
          return (
            <div className={photosClass}>
              <Photos />
            </div>
          )
        }}
      </SearchContext.Consumer>
    );
  }
}
