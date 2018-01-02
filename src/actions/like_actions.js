// Local Imports
import { amplitude }        from '../utilities/analytics_utility.js';
import * as APIUtility      from '../utilities/api_utility.js';
import { refreshAuthToken } from './user_actions.js';

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


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// TODO: get post body of liked post and send it to amplitude
export const createLike = (authToken, firebaseUserObj, likeObj) => (dispatch) => {
  return APIUtility.post(authToken, '/likes', likeObj)
    .then((newLike) => {
      amplitude.logEvent('Engagement - Click Like', { is_successful: true, is_create: true });

      dispatch(receiveLike(newLike));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj))
          .then((newAuthToken) => {
            return dispatch(createLike(newAuthToken, firebaseUserObj, likeObj));
          })
          .catch((error) => {
            throw error;
          })
      }

      if (!error.description) {
        error.description = 'POST like failed'
      }

      amplitude.logEvent('Engagement - Click Like', { is_successful: false, is_create: true, error: error.description });
      throw error;
    });
};

export const deleteLike = (authToken, firebaseUserObj, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/likes/' + postId)
    .then((deletedLike) => {
      amplitude.logEvent('Engagement - Click Like', { is_successful: true, is_create: false });
      dispatch(removeLike(deletedLike));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj))
          .then((newAuthToken) => {
            return dispatch(deleteLike(newAuthToken, firebaseUserObj, postId));
          })
          .catch((error) => {
            throw error;
          })
      }

      if (!error.description) {
        error.description = 'DEL like failed'
      }

      amplitude.logEvent('Engagement - Click Like', { is_successful: false, is_create: false, error: error.description });
      throw error;
    });
};
