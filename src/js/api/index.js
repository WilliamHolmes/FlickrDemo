import FlickrSDK from 'flickr-sdk';
import _ from 'underscore';

import { Flickr } from '../constants';

console.log('process', process.env);

const API = new FlickrSDK('05bce0f48defa09d59e60dce96dc97ff');

export default {
  photos: {
    search: async (text, options) => {
      try {
        const data = await API.photos.search({
          ...Flickr.ARGS,
          text,
          ...options,
          reqId: _.now()
        });
        console.log('FLICKR response', data);
        const { body: { photos } } = data;
        return photos;
      } catch(e) {
        console.error('[ERROR]', e);
        return [];
      }
    }
  }
}
