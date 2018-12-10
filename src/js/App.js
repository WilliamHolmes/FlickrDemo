import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import _ from 'underscore';

import Header from '_components/Header';
import ResultsContainer from '_components/ResultsContainer';

import { Strings, Search } from '_constants';

import SearchContext, { DEFAULT_STATE } from '_context/SearchContext'

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
    this.setState({ ...options, searchTerm, inProgress: true }, async () => {
      const { photo: allPhotos, pages } = await API.photos.search(searchTerm, options);
      if (_.isEqual(searchTerm, this.state.searchTerm)) {
        this.setState({ allPhotos, pages, inProgress: false });
      }
    });
  }

  async searchMorePhotos(page) {
    const { allPhotos: currentPhotos, searchTerm } = this.state;
    const { photo, pages } = await API.photos.search(searchTerm, { page });
    const allPhotos = _.union(currentPhotos, photo);
    console.log('searchMorePhotos -> allPhotos', allPhotos)
    this.setState({ allPhotos, pages, page, inProgress: false });
  }


  handleSearch(e) {
    const { value = '' } = e.target;
    const newSearchTerm = value.trim();
    const { searchTerm } = this.state;
    if (newSearchTerm) {
      if (searchTerm !== newSearchTerm) {
        this.searchPhotos(newSearchTerm, { pages: null, page: 1 });
      }
    } else {
      this.clearResults();
    }
  }

  handleScroll(page) {
    const { pages } = this.state;
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

    const { searchTerm = Strings.application.TITLE } = this.state;

    return (
      <SearchContext.Provider value={contextValue}>
        <Helmet title={searchTerm} />
        <Header />
        <ResultsContainer />
      </SearchContext.Provider>
    );
  }
}

export default hot(module)(App);
