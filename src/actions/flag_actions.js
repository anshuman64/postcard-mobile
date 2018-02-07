// Local Imports
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';
import { refreshAuthToken }    from './client_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const FLAG_ACTION_TYPES = {
  RECEIVE_FLAG: 'RECEIVE_FLAG',
  REMOVE_FLAG:  'REMOVE_FLAG'
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveFlag = (data) => {
  return { type: FLAG_ACTION_TYPES.RECEIVE_FLAG, data: data };
};

export const removeFlag = (data) => {
  return { type: FLAG_ACTION_TYPES.REMOVE_FLAG, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// TODO: get post body of flagged post and send it to amplitude
// Creates flag on a post from PostListItem
export const createFlag = (authToken, firebaseUserObj, postId) => (dispatch) => {
  return APIUtility.post(authToken, '/flags', { post_id: postId })
    .then((newFlag) => {
      amplitude.logEvent('Safety - Click Flag', { is_successful: true, is_create: true });

      dispatch(receiveFlag({ flag: newFlag }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createFlag, postId));
      }

      error = setErrorDescription(error, 'POST flag failed');
      amplitude.logEvent('Safety - Click Flag', { is_successful: false, is_create: true, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Deletes flag on a post from PostListItem
export const deleteFlag = (authToken, firebaseUserObj, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/flags/' + postId)
    .then((deletedFlag) => {
      amplitude.logEvent('Safety - Click Flag', { is_successful: true, is_create: false });
      dispatch(removeFlag({ flag: deletedFlag }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteFlag, postId));
      }

      error = setErrorDescription(error, 'DEL flag failed');
      amplitude.logEvent('Safety - Click Flag', { is_successful: false, is_create: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};
