import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import _ from 'underscore';

import Header from './components/Header';
import ResultsContainer from './components/ResultsContainer';

// import { Scroll, Search } from './constants';
import { Search } from './constants';

import SearchContext, { DEFAULT_STATE } from './context/SearchContext'

import API from './api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ...DEFAULT_STATE
    };
    _.bindAll(this, 'handleSearch', 'handleScroll');
    this.handleSearchThrottle = _.throttle(e => this.handleSearch(e), Search.THROTTLE_DELAY);
  }

  clearResults() {
    this.setState({ ...DEFAULT_STATE });
  }

  searchPhotos(searchTerm, options) {
    console.log('App -> searchPhotos -> searchTerm, options', searchTerm, options)
    this.setState({ ...options, searchTerm, inProgress: true }, async () => {
      const { photo: allPhotos, pages } = await API.photos.search(searchTerm, options);
      console.log('searchPhotos -> searchTerm, pages', searchTerm, pages);
      if (_.isEqual(searchTerm, this.state.searchTerm)) {
        this.setState({ allPhotos, pages, inProgress: false });
      }
    });
  }

  async searchMorePhotos(page) {
    const { allPhotos: currentPhotos, searchTerm } = this.state;
    console.log('App -> searchMorePhotos -> get page', page);
    const { photo, pages } = await API.photos.search(searchTerm, { page });
    console.log('searchPhotos -> currentPhotos, photo', currentPhotos, photo);
    const allPhotos = _.union(currentPhotos, photo)
    console.log('allPhotos', allPhotos);
    this.setState({ allPhotos, pages, page, inProgress: false });
  }


  handleSearch(e) {
    const { value = '' } = e.target;
    const newSearchTerm = value.trim();
    const { searchTerm } = this.state;
    if (newSearchTerm) {
      if (searchTerm !== newSearchTerm) {
        this.searchPhotos(newSearchTerm, { page: 1 });
      }
    } else {
      this.clearResults();
    }
  }

  handleScroll(page) {
    const { pages } = this.state;
    console.log('handleScroll -> get page', page, pages);
    if ((pages && pages > page)) {
      this.searchMorePhotos(page);
    }
  }

  render() {
    const contextValue = {
      ... this.state,
      handleSearch: this.handleSearchThrottle,
      handleScroll: this.handleScroll
    };

    return (
      <SearchContext.Provider value={contextValue}>
        <Header />
        <ResultsContainer />
      </SearchContext.Provider>
    );
  }
}

export default hot(module)(App);
