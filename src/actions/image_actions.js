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
  RECEIVE_IMAGE: 'RECEIVE_IMAGE',
  REMOVE_IMAGE:  'REMOVE_IMAGE'
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveImage = (data) => {
  return { type: IMAGE_ACTION_TYPES.RECEIVE_IMAGE, data: data };
};

export const removeImage = (data) => {
  return { type: IMAGE_ACTION_TYPES.REMOVE_IMAGE, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// Gets signedUrl from S3 and stores it
export const getImage = (firebaseUserObj, refreshAuthToken, avatarUrl) => (dispatch) => {
  return getFile(firebaseUserObj, refreshAuthToken, avatarUrl)
    .then((data) => {
      dispatch(receiveImage({ key: avatarUrl, url: data }));
    })
    .catch((error) => {
      amplitude.logEvent('Error - Get Image', { error_description: error.description, error_message: error.message });
    })
};

// Deletes like on a post from PostListItem
export const deleteImage = (authToken, firebaseUserObj, userId, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/likes/' + postId)
    .then((deletedLike) => {
      amplitude.logEvent('Engagement - Click Like', { is_successful: true, is_create: false });
      dispatch(removeLike({ like: deletedLike, userId: userId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteLike, userId, postId));
      }

      amplitude.logEvent('Engagement - Click Like', { is_successful: false, is_create: false, error_description: error.description, error_message: error.message });
      throw setErrorDescription(error, 'DEL like failed');
    });
};
