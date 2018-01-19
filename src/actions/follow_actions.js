// Local Imports
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';
import { refreshAuthToken }    from './user_actions.js';

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

export const createFollow = (authToken, firebaseUserObj, userId, followeeId) => (dispatch) => {
  return APIUtility.post(authToken, '/follows', { followee_id: followeeId })
    .then((newFollow) => {
      amplitude.logEvent('Engagement - Click Follow', { is_successful: true, is_create: true, follower_id: userId, followee_id: followeeId });

      dispatch(receiveFollow({ follow: newFollow, userId: userId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createFollow, userId, followeeId));
      }

      amplitude.logEvent('Engagement - Click Follow', { is_successful: false, is_create: true, follower_id: userId, followee_id: followeeId, error: error.description });
      throw setErrorDescription(error, 'POST follow failed');
    });
};

export const deleteFollow = (authToken, firebaseUserObj, userId, followeeId) => (dispatch) => {
  return APIUtility.del(authToken, '/follows/' + followeeId)
    .then((deletedFollow) => {
      amplitude.logEvent('Engagement - Click Follow', { is_successful: true, is_create: false, follower_id: userId, followee_id: followeeId });
      dispatch(removeFollow({ follow: deletedFollow, userId: userId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteFollow, userId, followeeId));
      }

      amplitude.logEvent('Engagement - Click Follow', { is_successful: false, is_create: false, follower_id: userId, followee_id: followeeId, error: error.description });
      throw setErrorDescription(error, 'DEL follow failed');
    });
};
