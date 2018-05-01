// Library Imports
import _ from 'lodash';

// Local Imports
import * as FileUtility     from '../utilities/file_utility';
import { refreshAuthToken } from './client_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const MEDIUM_ACTION_TYPES = {
  RECEIVE_MEDIA: 'RECEIVE_MEDIA',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// media (array): array of photo and video urls for caching
export const receiveMedia = (data) => {
  return { type: MEDIUM_ACTION_TYPES.RECEIVE_MEDIA, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const refreshCredsAndGetImage = (firebaseUserObj, avatarUrl) => (dispatch) => {
  dispatch(refreshAuthToken(firebaseUserObj))
    .then(() => {
      dispatch(getMedia(avatarUrl));
    })
}

// Gets signedUrl from S3 and stores it
// TODO: make this work with videos
export const getMedia = (object) => (dispatch) => {
  let media = [];

  let addMedium = (obj) => {
    // If the object is a post or message with an image
    if (obj.image_url) {
      media.push({ key: obj.image_url, url: FileUtility.getFile(obj.image_url), type: 'PHOTO' });
    }

    // If the object is a post with an author with an avatar_url
    if (obj.author && obj.author.avatar_url) {
      media.push({ key: obj.author.avatar_url, url: FileUtility.getFile(obj.author.avatar_url), type: 'PHOTO' });
    }

    // If the object is a message with a post with an image_url
    if (obj.post && obj.post.image_url) {
      media.push({ key: obj.post.image_url, url: FileUtility.getFile(obj.post.image_url), type: 'PHOTO' });
    }

    // If the object is a user with an avatar_url
    if (obj.avatar_url) {
      media.push({ key: obj.avatar_url, url: FileUtility.getFile(obj.avatar_url), type: 'PHOTO' });
    }

    // If the object is a message with a medium
    if (obj.medium) {
      media.push({ key: obj.medium.url, url: FileUtility.getFile(obj.medium.url), type: obj.medium.medium_type});
    }

    // If the object is a post with media
    if (obj.media) {
      _.forEach(obj.media, (medium) => {
        media.push({ key: medium.url, url: FileUtility.getFile(medium.url), type: medium.medium_type});
      })
    }
  }

  if (Array.isArray(object)) {
    _.forEach(object, (obj) => {
      addMedium(obj);
    });
  } else {
    addMedium(object);
  }

  dispatch(receiveMedia({ media: media }));
};
