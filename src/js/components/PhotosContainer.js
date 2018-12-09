import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'underscore';

import Photos from './photos';

import SearchContext from '../context/SearchContext';

export default class PhotosContainer extends Component {
  constructor(props) {
    super(props);
    _.bindAll(this, 'onScroll');
  }
  onScroll(e) {
    console.log('onScroll', e);
  }
  render() {
    return (
      <SearchContext.Consumer>
        {({ inProgress }) => {
          const photosClass = classnames('photosContainer', {
            inactive: inProgress
          });
          return (
            <div className={photosClass} onScroll={this.onScroll}>
              <Photos />
            </div>
          )
        }}
      </SearchContext.Consumer>
    );
  }
}
