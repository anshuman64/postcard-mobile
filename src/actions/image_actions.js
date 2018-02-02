import * as _ from 'lodash';

// Local Imports
import * as FileUtility     from '../utilities/file_utility.js';
import { refreshAuthToken } from './user_actions.js';

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
export const getImagesFromPosts = (posts) => (dispatch) => {
  let postImages = [];

  _.forEach(posts, (post) => {
    if (post.image_url) {
      postImages.push({ key: post.image_url, url: FileUtility.getFile(post.image_url) });
    }

    if (post.author.avatar_url) {
      postImages.push({ key: post.author.avatar_url, url: FileUtility.getFile(post.author.avatar_url) });
    }
  });

  dispatch(receiveImages(postImages));
};
