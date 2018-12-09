import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import _ from 'underscore';

import Header from './components/Header';
import ResultsContainer from './components/ResultsContainer';

import { Scroll, Search } from './constants';

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
    this.handleScrollhrottle = _.throttle(e => this.handleScroll(e), Scroll.THROTTLE_DELAY, { leading: false });
  }

  clearResults() {
    this.setState({ ...DEFAULT_STATE });
  }

  searchPhotos(searchTerm, options) {
    console.log('App -> searchPhotos -> searchTerm, options', searchTerm, options)
    this.setState({ ...options, searchTerm, inProgress: true }, async () => {
      const { photo: allPhotos, pages } = await API.photos.search(searchTerm, options);
      if (_.isEqual(searchTerm, this.state.searchTerm)) {
        this.setState({ allPhotos, pages, inProgress: false });
      }
    });
  }

  searchMorePhotos() {
    this.setState({ inProgress: true }, async () => {
      const { allPhotos: currentPhotos, searchTerm, page: currentPage } = this.state;
      const page = (currentPage + 1);
      const { photo, pages } = await API.photos.search(searchTerm, { page });
      const allPhotos = _.union(currentPhotos, photo)
      this.setState({ allPhotos, pages, page, inProgress: false });
    })
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

  handleScroll() {
    console.log('handleScroll');
    const { inProgress, page, pages } = this.state;
    if (!inProgress && (pages && pages > page)) {
      this.searchMorePhotos();
    }
  }

  render() {
    const contextValue = {
      ... this.state,
      handleSearch: this.handleSearchThrottle,
      handleScroll: this.handleScrollhrottle
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
