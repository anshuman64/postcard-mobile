// Local Imports
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';
import { refreshAuthToken }    from './client_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const LIKE_ACTION_TYPES = {
  RECEIVE_LIKE: 'RECEIVE_LIKE',
  REMOVE_LIKE:  'REMOVE_LIKE'
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveLike = (data) => {
  return { type: LIKE_ACTION_TYPES.RECEIVE_LIKE, data: data };
};

export const removeLike = (data) => {
  return { type: LIKE_ACTION_TYPES.REMOVE_LIKE, data: data };
};

export const receiveUserLike = (data) => {
  console.error('heyyy')
}

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// TODO: get post body of liked post and send it to amplitude
// Creates like on a post from PostListItem
export const createLike = (authToken, firebaseUserObj, clientId, postId) => (dispatch) => {
  return APIUtility.post(authToken, '/likes', { post_id: postId })
    .then((newLike) => {
      amplitude.logEvent('Engagement - Click Like', { is_successful: true, is_create: true });
      dispatch(receiveLike({ like: newLike, clientId: clientId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createLike, clientId, postId));
      }

      error = setErrorDescription(error, 'POST like failed');
      amplitude.logEvent('Engagement - Click Like', { is_successful: false, is_create: true, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Deletes like on a post from PostListItem
export const deleteLike = (authToken, firebaseUserObj, clientId, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/likes/' + postId)
    .then((deletedLike) => {
      amplitude.logEvent('Engagement - Click Like', { is_successful: true, is_create: false });
      dispatch(removeLike({ like: deletedLike, clientId: clientId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteLike, clientId, postId));
      }

      error = setErrorDescription(error, 'DEL like failed');
      amplitude.logEvent('Engagement - Click Like', { is_successful: false, is_create: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};
