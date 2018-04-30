// Library Imports
import _ from 'lodash';

// Local Imports
import * as FileUtility     from '../utilities/file_utility';
import { refreshAuthToken } from './client_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const IMAGE_ACTION_TYPES = {
  RECEIVE_PHOTOS: 'RECEIVE_PHOTOS',
  RECEIVE_IMAGES: 'RECEIVE_IMAGES',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// photos (array): array of photo local urls for cameraRoll
export const receivePhotos = (data) => {
  return { type: IMAGE_ACTION_TYPES.RECEIVE_PHOTOS, data: data };
};

// images (array): array of image urls for caching
export const receiveImages = (data) => {
  return { type: IMAGE_ACTION_TYPES.RECEIVE_IMAGES, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const refreshCredsAndGetImage = (firebaseUserObj, avatarUrl) => (dispatch) => {
  dispatch(refreshAuthToken(firebaseUserObj))
    .then(() => {
      dispatch(getImages(avatarUrl));
    })
}

// Gets signedUrl from S3 and stores it
export const getImages = (object) => (dispatch) => {
  let images = [];

  let addImage = (obj) => {
    // If the object is a post or message with an image
    if (obj.image_url) {
      images.push({ key: obj.image_url, url: FileUtility.getFile(obj.image_url) });
    }

    // If the object is a post with an author with an avatar_url
    if (obj.author && obj.author.avatar_url) {
      images.push({ key: obj.author.avatar_url, url: FileUtility.getFile(obj.author.avatar_url) });
    }

    // If the object is a message with a post with an image_url
    if (obj.post && obj.post.image_url) {
      images.push({ key: obj.post.image_url, url: FileUtility.getFile(obj.post.image_url) });
    }

    // If the object is a user with an avatar_url
    if (obj.avatar_url) {
      images.push({ key: obj.avatar_url, url: FileUtility.getFile(obj.avatar_url) });
    }
  }

  if (Array.isArray(object)) {
    _.forEach(object, (obj) => {
      addImage(obj);
    });
  } else {
    addImage(object);
  }

  dispatch(receiveImages({ images: images }));
};
