import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'underscore';
import { Masonry } from 'react-masonry-responsive';

import { CircularProgress } from '@material-ui/core';

import PhotoCard from './PhotoCard';

import SearchContext from '_context/SearchContext';

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
        {({ allPhotos, handleScroll, page, pages }) => {
          const items = this.getPhotosNodes(allPhotos);
          const hasMore = (pages && pages > page);
          return (
            <InfiniteScroll
              threshold={350}
              initialLoad={false}
              pageStart={1}
              loadMore={handleScroll}
              hasMore={hasMore}
              loader={<CircularProgress key={'loadMoreSpinner'} disableShrink className={'moreSpinner'}/>}
              useWindow
            >
              <Masonry items={items} minColumnWidth={300} />
            </InfiniteScroll>
          );
        }}
      </SearchContext.Consumer>
    );
  }
}
