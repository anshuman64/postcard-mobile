// Local Imports
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';
import { refreshAuthToken }    from './user_actions.js';

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
export const createFlag = (authToken, firebaseUserObj, userId, postId) => (dispatch) => {
  return APIUtility.post(authToken, '/flags', { post_id: postId })
    .then((newFlag) => {
      amplitude.logEvent('Engagement - Click Flag', { is_successful: true, is_create: true });

      dispatch(receiveFlag({ flag: newFlag, userId: userId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createFlag, userId, postId));
      }

      amplitude.logEvent('Engagement - Click Flag', { is_successful: false, is_create: true, error: error.description });
      throw setErrorDescription(error, 'POST flag failed');
    });
};

// Deletes flag on a post from PostListItem
export const deleteFlag = (authToken, firebaseUserObj, userId, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/flags/' + postId)
    .then((deletedFlag) => {
      amplitude.logEvent('Engagement - Click Flag', { is_successful: true, is_create: false });
      dispatch(removeFlag({ flag: deletedFlag, userId: userId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteFlag, userId, postId));
      }

      amplitude.logEvent('Engagement - Click Flag', { is_successful: false, is_create: false, error: error.description });
      throw setErrorDescription(error, 'DEL flag failed');
    });
};
