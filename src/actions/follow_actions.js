// Local Imports
import { amplitude }           from '../utilities/analytics_utility';
import * as APIUtility         from '../utilities/api_utility';
import { setErrorDescription } from '../utilities/error_utility';
import { refreshAuthToken }    from './client_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const FOLLOW_ACTION_TYPES = {
  RECEIVE_FOLLOW: 'RECEIVE_FOLLOW',
  REMOVE_FOLLOW:  'REMOVE_FOLLOW'
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveFollow = (data) => {
  return { type: FOLLOW_ACTION_TYPES.RECEIVE_FOLLOW, data: data };
};

export const removeFollow = (data) => {
  return { type: FOLLOW_ACTION_TYPES.REMOVE_FOLLOW, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// Creates follow between this user and another user from PostListItem or ProfileHeader
export const createFollow = (authToken, firebaseUserObj, followeeId) => (dispatch) => {
  return APIUtility.post(authToken, '/follows', { followee_id: followeeId })
    .then((newFollow) => {
      amplitude.logEvent('Engagement - Click Follow', { is_successful: true, is_create: true, followee_id: followeeId });

      dispatch(receiveFollow({ follow: newFollow }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createFollow, followeeId));
      }

      error = setErrorDescription(error, 'POST follow failed');
      amplitude.logEvent('Engagement - Click Follow', { is_successful: false, is_create: true, followee_id: followeeId, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Deletes follow between this user and another user from PostListItem or ProfileHeader
export const deleteFollow = (authToken, firebaseUserObj, followeeId) => (dispatch) => {
  return APIUtility.del(authToken, '/follows/' + followeeId)
    .then((deletedFollow) => {
      amplitude.logEvent('Engagement - Click Follow', { is_successful: true, is_create: false, followee_id: followeeId });
      dispatch(removeFollow({ follow: deletedFollow }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteFollow, followeeId));
      }

      error = setErrorDescription(error, 'DEL follow failed');
      amplitude.logEvent('Engagement - Click Follow', { is_successful: false, is_create: false, followee_id: followeeId, error_description: error.description, error_message: error.message });
      throw error;
    });
};
