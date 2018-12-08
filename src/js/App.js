import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import _ from 'underscore';

import Header from './components/Header';
import ResultsContainer from './components/ResultsContainer';

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
    this.handleSearchThrottle = _.throttle(e => this.handleSearch(e), Search.THROTTLE_DELAY, { leading: false });
  }

  clearResults() {
    this.setState({ ...DEFAULT_STATE });
  }

  searchPhotos(searchTerm, options) {
    this.setState({ ...options, searchTerm, inProgress: true }, async () => {
      const photos = await API.photos.search(searchTerm, options);
      if (_.isEqual(searchTerm, this.state.searchTerm)) {
        this.setState({ allPhotos: photos, inProgress: false });
      }
    });
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
