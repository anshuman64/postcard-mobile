import * as _ from 'lodash';

// Local Imports
import * as FileUtility     from '../utilities/file_utility.js';
import { refreshAuthToken } from './client_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const IMAGE_ACTION_TYPES = {
  RECEIVE_IMAGE:  'RECEIVE_IMAGE',
  RECEIVE_IMAGES: 'RECEIVE_IMAGES',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveImage = (data) => {
  return { type: IMAGE_ACTION_TYPES.RECEIVE_IMAGE, data: data };
};

export const receiveImages = (data) => {
  return { type: IMAGE_ACTION_TYPES.RECEIVE_IMAGES, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// Gets signedUrl from S3 and stores it
export const getImage = (avatarUrl) => (dispatch) => {
  dispatch(receiveImage({ key: avatarUrl, url: FileUtility.getFile(avatarUrl) }));
};

export const refreshCredsAndGetImage = (firebaseUserObj, avatarUrl) => (dispatch) => {
  dispatch(refreshAuthToken(firebaseUserObj))
    .then(() => {
      dispatch(getImage(avatarUrl));
    })
}

// Gets signedUrl from S3 and stores it
export const getImages = (array) => (dispatch) => {
  let images = [];

  _.forEach(array, (obj) => {
    if (obj.image_url) {
      images.push({ key: obj.image_url, url: FileUtility.getFile(obj.image_url) });
    }

    if (obj.author && obj.author.avatar_url) {
      images.push({ key: obj.author.avatar_url, url: FileUtility.getFile(obj.author.avatar_url) });
    }

    if (obj.post && obj.post.image_url) {
      images.push({ key: obj.post.image_url, url: FileUtility.getFile(obj.post.image_url) });
    }
  });

  dispatch(receiveImages(images));
};
