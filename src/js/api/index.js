import FlickrSDK from 'flickr-sdk';
import _ from 'underscore';

import { Flickr } from '_constants';

const API = new FlickrSDK('05bce0f48defa09d59e60dce96dc97ff');

export default {
  photos: {
    search: async (text, options) => {
      console.log('REQUEST API.photos.search -> text, options', text, options)
      try {
        const data = await API.photos.search({
          ...Flickr.ARGS,
          text,
          ...options,
          reqId: _.now()
        });
        console.log('RESPONSE API.photos.search -> data', data);
        const { body: { photos } } = data;
        return photos;
      } catch(e) {
        console.error('[ERROR]', e);
        return [];
      }
    }
  }
}
