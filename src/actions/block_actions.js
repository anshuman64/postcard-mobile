// Local Imports
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';
import { refreshAuthToken }    from './client_actions.js';
import { deleteFriendship }    from './friendship_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const BLOCK_ACTION_TYPES = {
  RECEIVE_BLOCKED_USERS: 'RECEIVE_BLOCKED_USERS',
  RECEIVE_BLOCK:         'RECEIVE_BLOCK',
  REMOVE_BLOCK:          'REMOVE_BLOCK'
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveBlockedUsers = (data) => {
  return { type: BLOCK_ACTION_TYPES.RECEIVE_BLOCKED_USERS, data: data };
};

export const receiveBlock = (data) => {
  return { type: BLOCK_ACTION_TYPES.RECEIVE_BLOCK, data: data };
};

export const removeBlock = (data) => {
  return { type: BLOCK_ACTION_TYPES.REMOVE_BLOCK, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const getBlockedUsers = (authToken, firebaseUserObj) => (dispatch) => {
  return APIUtility.get(authToken, '/blocks')
    .then((blockedUsers) => {
      dispatch(receiveBlockedUsers({ blockedUsers: blockedUsers }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getBlockedUsers));
      }

      throw setErrorDescription(error, 'GET blocked users failed');
    });
};

// Creates block between this user and another user or ProfileHeader
export const createBlock = (authToken, firebaseUserObj, blockeeId) => (dispatch) => {
  return APIUtility.post(authToken, '/blocks', { blockee_id: blockeeId })
    .then((newBlock) => {
      amplitude.logEvent('Safety - Create Block', { is_successful: true, blockee_id: blockeeId });

      dispatch(receiveBlock({ block: newBlock }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createBlock, blockeeId));
      }

      error = setErrorDescription(error, 'POST block failed');
      amplitude.logEvent('Safety - Create Block', { is_successful: false, blockee_id: blockeeId, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Deletes block between this user and another user or ProfileHeader
export const deleteBlock = (authToken, firebaseUserObj, blockeeId) => (dispatch) => {
  return APIUtility.del(authToken, '/blocks/' + blockeeId)
    .then((deletedBlock) => {
      amplitude.logEvent('Safety - Delete Block', { is_successful: true, blockee_id: blockeeId });
      return deletedBlock;
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteBlock, blockeeId));
      }

      error = setErrorDescription(error, 'DEL block failed');
      amplitude.logEvent('Safety - Delete Block', { is_successful: false, blockee_id: blockeeId, error_description: error.description, error_message: error.message });
      throw error;
    });
};
