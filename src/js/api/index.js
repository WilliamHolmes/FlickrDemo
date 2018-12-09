import FlikrSDK from 'flickr-sdk';

import { Flikr } from '../constants';

const API = new FlikrSDK('05bce0f48defa09d59e60dce96dc97ff');

export default {
  photos: {
    search: async (text, options) => {
      try {
        const data = await API.photos.search({
          ...Flikr.ARGS,
          text,
          ...options
        });
        console.log('FLIKR response', data);
        const { body: { photos } } = data;
        return photos;
      } catch(e) {
        console.error('[ERROR]', e);
        return [];
      }
    }
  }
}
