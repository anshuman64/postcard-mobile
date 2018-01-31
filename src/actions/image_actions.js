import * as _ from 'lodash';

// Local Imports
import * as FileUtility        from '../utilities/file_utility.js';
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';
import { refreshAuthToken }    from './user_actions.js';

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

// Gets signedUrl from S3 and stores it
export const getImagesFromPosts = (posts) => (dispatch) => {
  let postImages = [];

  _.forEach(posts, (post) => {
    if (post.image_url) {
      postImages.push({ key: post.image_url, url: FileUtility.getFile(post.image_url) });
    }

    if (post.author_avatar_url) {
      postImages.push({ key: post.author_avatar_url, url: FileUtility.getFile(post.author_avatar_url) });
    }
  });

  dispatch(receiveImages(postImages));
};
