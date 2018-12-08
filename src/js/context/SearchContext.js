import React from 'react';

export const DEFAULT_STATE = {
  searchTerm: '',
  allPhotos: [],
  page: 1,
  inProgress: false
};

const SearchContext = React.createContext('SearchContext');

export default SearchContext;
