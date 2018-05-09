// Local Imports
import { amplitude }                                  from '../utilities/analytics_utility';
import * as APIUtility                                from '../utilities/api_utility';
import { setErrorDescription, refreshTokenAndResume } from '../utilities/error_utility';

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

// blockedUsers (array): array of user objects
export const receiveBlockedUsers = (data) => {
  return { type: BLOCK_ACTION_TYPES.RECEIVE_BLOCKED_USERS, data: data };
};

// block (block object): block object of created block
export const receiveBlock = (data) => {
  return { type: BLOCK_ACTION_TYPES.RECEIVE_BLOCK, data: data };
};

// block (block object): block object of removed block
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
        return dispatch(refreshTokenAndResume(firebaseUserObj, getBlockedUsers));
      }

      error = setErrorDescription(error, 'GET blocked users failed');
      amplitude.logEvent('Safety - Get Blocks', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Creates block between this user and another user
export const createBlock = (authToken, firebaseUserObj, blockeeId) => (dispatch) => {
  return APIUtility.post(authToken, '/blocks', { blockee_id: blockeeId })
    .then((newBlock) => {
      amplitude.logEvent('Safety - Create Block', { is_successful: true, blockee_id: blockeeId });

      dispatch(receiveBlock({ block: newBlock }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshTokenAndResume(firebaseUserObj, createBlock, blockeeId));
      }

      error = setErrorDescription(error, 'POST block failed');
      amplitude.logEvent('Safety - Create Block', { is_successful: false, blockee_id: blockeeId, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Deletes block between this user and another user. removeBlock has to be called from component
export const deleteBlock = (authToken, firebaseUserObj, blockeeId) => (dispatch) => {
  return APIUtility.del(authToken, '/blocks/' + blockeeId)
    .then((deletedBlock) => {
      amplitude.logEvent('Safety - Delete Block', { is_successful: true, blockee_id: blockeeId });
      return deletedBlock;
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshTokenAndResume(firebaseUserObj, deleteBlock, blockeeId));
      }

      error = setErrorDescription(error, 'DEL block failed');
      amplitude.logEvent('Safety - Delete Block', { is_successful: false, blockee_id: blockeeId, error_description: error.description, error_message: error.message });
      throw error;
    });
};
