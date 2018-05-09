// Local Imports
import { amplitude }                                  from '../utilities/analytics_utility';
import * as APIUtility                                from '../utilities/api_utility';
import { setErrorDescription, refreshTokenAndResume } from '../utilities/error_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const LIKE_ACTION_TYPES = {
  RECEIVE_LIKE: 'RECEIVE_LIKE',
  REMOVE_LIKE:  'REMOVE_LIKE',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// like (like object): like object of created like
// clientId (int): id of client to add post to liked posts
export const receiveLike = (data) => {
  return { type: LIKE_ACTION_TYPES.RECEIVE_LIKE, data: data };
};

// like (like object): like object of destroyed like
// clientId (int): id of client to remove post from liked posts
export const removeLike = (data) => {
  return { type: LIKE_ACTION_TYPES.REMOVE_LIKE, data: data };
};

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
        return dispatch(refreshTokenAndResume(firebaseUserObj, createLike, clientId, postId));
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
        return dispatch(refreshTokenAndResume(firebaseUserObj, deleteLike, clientId, postId));
      }

      error = setErrorDescription(error, 'DEL like failed');
      amplitude.logEvent('Engagement - Click Like', { is_successful: false, is_create: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};
