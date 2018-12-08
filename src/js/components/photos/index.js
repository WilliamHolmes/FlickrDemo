import React, { Component } from 'react';
import _ from 'underscore';

import { Masonry } from 'react-masonry-responsive';

import PhotoCard from './PhotoCard';

import SearchContext from '../../context/SearchContext';

export default class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    _.bindAll(this, 'handleExpandClick');
  }

  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  getPhotosNodes(photos) {
    return photos.map(photo => ({
      key: photo.id,
      node: <PhotoCard photo={photo} />
    }));
  }
  render() {
    return (
      <SearchContext.Consumer>
        {({ allPhotos }) => {
          const items = this.getPhotosNodes(allPhotos);
          return (
            <Masonry items={items} minColumnWidth={300} />
          );
        }}
      </SearchContext.Consumer>
    );
  }
}
