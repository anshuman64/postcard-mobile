// Library Imports
import _ from 'lodash';

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
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future." || error.message === 'Token refresh in progress') {
        return dispatch(refreshAuthToken(firebaseUserObj, getCircles));
      }

      error = setErrorDescription(error, 'GET circles failed');
      amplitude.logEvent('Circles - Get Circles', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Creates circle with list of user_ids
export const createCircle = (authToken, firebaseUserObj, name, recipientIds) => (dispatch) => {
  let user_ids = [];
  let group_ids = [];

  _.forEach(recipientIds, (recipientId) => {
    if (recipientId > 0) {
      user_ids.push(recipientId);
    } else {
      group_ids.push(-1 * recipientId);
    }
  });

  return APIUtility.post(authToken, '/circles', { name: name, user_ids: user_ids, group_ids: group_ids })
    .then((newCircle) => {
      amplitude.logEvent('Circles - Create Circle', { is_successful: true, name: name, num_users: recipientIds.length });
      dispatch(receiveCircle({ circle: newCircle }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future." || error.message === 'Token refresh in progress') {
        return dispatch(refreshAuthToken(firebaseUserObj, createCircle, name, recipientIds));
      }

      if (error.message === 'Name has already been taken') {
        error = setErrorDescription(error, 'Circle name has already been taken');
      } else if (error.message === 'Minimum 2 recipients required') {
        error = setErrorDescription(error, 'Minimum 2 recipients required');
      } else {
        error = setErrorDescription(error, 'POST circles failed');
      }

      amplitude.logEvent('Circles - Create Circle', { is_successful: false, name: name, num_users: recipientIds.length, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Deletes circle
export const deleteCircle = (authToken, firebaseUserObj, circleId) => (dispatch) => {
  return APIUtility.del(authToken, '/circles/' + circleId)
    .then((deletedCircle) => {
      amplitude.logEvent('Circles - Delete Circle', { is_successful: true });
      dispatch(removeCircle({ circle: deletedCircle }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future." || error.message === 'Token refresh in progress') {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteCircle, circleId));
      }

      error = setErrorDescription(error, 'DEL circle failed');
      amplitude.logEvent('Circles - Delete Circle', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};
