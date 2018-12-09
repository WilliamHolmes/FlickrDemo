export const Strings = {
  application: {
    TITLE: 'Frontend Engineer Challenge'
  },
  placeholders: {
    SEARCH: 'Tag...'
  },
  templates: {
    FLIKR_URL: 'https://www.flickr.com/photos/<%= owner %>/<%= id %>',
    NO_RESULTS: 'Oops! There are no matches for "<%= searchTerm %>"',
    PHOTO_URL: 'https://farm<%= farm %>.staticflickr.com/<%= server %>/<%= id %>_<%= secret %>.jpg',
    SEARCH_AGAIN: 'Please try broadening your search.'
  }
}

export const Flikr = {
  ARGS: {
    extras: 'icon_urls_deep,tags,description,date_taken,owner_name',
    per_page: '20',
    safe_search: 1,
    sort: 'date-taken-desc'
  }
}

export const Search = {
  THROTTLE_DELAY: 200
};

export const Scroll = {
  THROTTLE_DELAY: 300
};
