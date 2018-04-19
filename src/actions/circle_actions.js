// Local Imports
import { amplitude }           from '../utilities/analytics_utility';
import * as APIUtility         from '../utilities/api_utility';
import { setErrorDescription } from '../utilities/error_utility';
import { refreshAuthToken }    from './client_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const CIRCLE_ACTION_TYPES = {
  RECEIVE_CIRCLE: 'RECEIVE_CIRCLE',
  REMOVE_CIRCLE:  'REMOVE_CIRCLE',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// circle (circle object): circle object of created circle
export const receiveCircle = (data) => {
  return { type: CIRCLE_ACTION_TYPES.RECEIVE_CIRCLE, data: data };
};

// circle (circle object): circle object of destroyed circle
export const removeCircle = (data) => {
  return { type: CIRCLE_ACTION_TYPES.REMOVE_CIRCLE, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// Creates circle with list of user_ids
export const createCircle = (authToken, firebaseUserObj, name, users) => (dispatch) => {
  return APIUtility.post(authToken, '/circles', { name: name, user_ids: users })
    .then((newCircle) => {
      amplitude.logEvent('Engagement - Create Circle', { is_successful: true, name: name, num_users: users.length });
      dispatch(receiveCircle({ circle: newCircle }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createCircle, name, users));
      }

      error = setErrorDescription(error, 'POST circle failed');
      amplitude.logEvent('Engagement - Create Circle', { is_successful: false, name: name, num_users: users.length, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Deletes circle on a post from PostListItem
export const deleteCircle = (authToken, firebaseUserObj, clientId, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/circles/' + postId)
    .then((deletedCircle) => {
      amplitude.logEvent('Engagement - Click Circle', { is_successful: true, is_create: false });
      dispatch(removeCircle({ circle: deletedCircle, clientId: clientId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteCircle, clientId, postId));
      }

      error = setErrorDescription(error, 'DEL circle failed');
      amplitude.logEvent('Engagement - Click Circle', { is_successful: false, is_create: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};
