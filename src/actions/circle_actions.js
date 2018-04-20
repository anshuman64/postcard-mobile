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
  RECEIVE_CIRCLES: 'RECEIVE_CIRCLES',
  RECEIVE_CIRCLE:  'RECEIVE_CIRCLE',
  REMOVE_CIRCLE:   'REMOVE_CIRCLE',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// circles (array): array of circle objects
export const receiveCircles = (data) => {
  return { type: CIRCLE_ACTION_TYPES.RECEIVE_CIRCLES, data: data };
};

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

// Gets all circles for client
export const getCircles = (authToken, firebaseUserObj) => (dispatch) => {
  return APIUtility.get(authToken, '/circles')
    .then((circles) => {
      dispatch(receiveCircles({ circles: circles }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getCircles));
      }

      throw setErrorDescription(error, 'GET circles failed');
    });
};

// Creates circle with list of user_ids
export const createCircle = (authToken, firebaseUserObj, name, users) => (dispatch) => {
  return APIUtility.post(authToken, '/circles', { name: name, user_ids: users })
    .then((newCircle) => {
      amplitude.logEvent('Groups - Create Circle', { is_successful: true, name: name, num_users: users.length });
      dispatch(receiveCircle({ circle: newCircle }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createCircle, name, users));
      }

      if (error.message === 'Name has already been taken') {
        error = setErrorDescription(error, 'Circle name has already been taken');
      } else if (error.message === 'Minimum 2 user_ids required') {
        error = setErrorDescription(error, 'Minimum 2 user_ids required');
      } else {
        error = setErrorDescription(error, 'POST circles failed');
      }

      amplitude.logEvent('Groups - Create Circle', { is_successful: false, name: name, num_users: users.length, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Deletes circle
export const deleteCircle = (authToken, firebaseUserObj, circleId) => (dispatch) => {
  return APIUtility.del(authToken, '/circles/' + circleId)
    .then((deletedCircle) => {
      amplitude.logEvent('Groups - Delete Circle', { is_successful: true });
      dispatch(removeCircle({ circle: deletedCircle }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteCircle, circleId));
      }

      error = setErrorDescription(error, 'DEL circle failed');
      amplitude.logEvent('Groups - Delete Circle', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};
