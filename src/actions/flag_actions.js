// Local Imports
import { amplitude }           from '../utilities/analytics_utility';
import * as APIUtility         from '../utilities/api_utility';
import { setErrorDescription } from '../utilities/error_utility';
import { refreshAuthToken }    from './client_actions';

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

// flag (flag object): flag object of created flag
export const receiveFlag = (data) => {
  return { type: FLAG_ACTION_TYPES.RECEIVE_FLAG, data: data };
};

// flag (flag object): flag object of deleted flag
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
      amplitude.logEvent('Safety - Create Flag', { is_successful: true, post_id: postId });

      dispatch(receiveFlag({ flag: newFlag }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createFlag, postId));
      }

      error = setErrorDescription(error, 'POST flag failed');
      amplitude.logEvent('Safety - Create Flag', { is_successful: false, post_id: postId, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Deletes flag on a post from PostListItem
export const deleteFlag = (authToken, firebaseUserObj, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/flags/' + postId)
    .then((deletedFlag) => {
      amplitude.logEvent('Safety - Delete Flag', { is_successful: true, post_id: postId });
      dispatch(removeFlag({ flag: deletedFlag }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteFlag, postId));
      }

      error = setErrorDescription(error, 'DEL flag failed');
      amplitude.logEvent('Safety - Delete Flag', { is_successful: false, post_id: postId, error_description: error.description, error_message: error.message });
      throw error;
    });
};
