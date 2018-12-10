export const Strings = {
  application: {
    TITLE: 'Flickr Photo Search'
  },
  placeholders: {
    SEARCH: 'Tag...'
  },
  templates: {
    FLICKR_URL: 'https://www.flickr.com/photos/<%= owner %>/<%= id %>',
    NO_RESULTS: 'Oops! There are no matches for "<%= searchTerm %>"',
    PHOTO_URL: 'https://farm<%= farm %>.staticflickr.com/<%= server %>/<%= id %>_<%= secret %>.jpg',
    SEARCH_AGAIN: 'Please try broadening your search.'
  },
  tags: {
    HIDE: 'Hide tags',
    SHOW: 'Show tags'
  }
}

export const Flickr = {
  ARGS: {
    extras: 'icon_urls_deep,tags,date_taken,owner_name',
    media: 'photos',
    per_page: 20,
    sort: 'date-taken-desc'
  }
}

export const Search = {
  THROTTLE_DELAY: 200
};
