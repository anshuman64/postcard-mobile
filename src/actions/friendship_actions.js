// Local Imports
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';
import { refreshAuthToken }    from './user_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const FRIENDSHIP_ACTION_TYPES = {
  RECEIVE_FRIENDSHIP: 'RECEIVE_FRIENDSHIP',
  REMOVE_FRIENDSHIP:  'REMOVE_FRIENDSHIP'
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveFriendship = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.RECEIVE_FRIENDSHIP, data: data };
};

export const removeFriendship = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.REMOVE_FRIENDSHIP, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// TODO: get post body of liked post and send it to amplitude
// Creates like on a post from PostListItem
export const createFriendship = (authToken, firebaseUserObj, userId, postId) => (dispatch) => {
  return APIUtility.post(authToken, '/likes', { post_id: postId })
    .then((newFriendship) => {
      amplitude.logEvent('Engagement - Click Friendship', { is_successful: true, is_create: true });
      dispatch(receiveFriendship({ like: newFriendship, userId: userId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createFriendship, userId, postId));
      }

      error = setErrorDescription(error, 'POST like failed');
      amplitude.logEvent('Engagement - Click Friendship', { is_successful: false, is_create: true, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Deletes like on a post from PostListItem
export const deleteFriendship = (authToken, firebaseUserObj, userId, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/likes/' + postId)
    .then((deletedFriendship) => {
      amplitude.logEvent('Engagement - Click Friendship', { is_successful: true, is_create: false });
      dispatch(removeFriendship({ like: deletedFriendship, userId: userId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteFriendship, userId, postId));
      }

      error = setErrorDescription(error, 'DEL like failed');
      amplitude.logEvent('Engagement - Click Friendship', { is_successful: false, is_create: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};
