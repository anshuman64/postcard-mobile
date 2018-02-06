// Local Imports
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';
import { refreshAuthToken }    from './client_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const FRIEND_TYPES = {
  ACCEPTED: 'accepted',
  SENT:     'sent',
  RECEIVED: 'received',
}

export const FRIENDSHIP_ACTION_TYPES = {
  RECEIVE_FRIENDSHIPS:       'RECEIVE_FRIENDSHIPS',
  SEND_FRIENDSHIP_REQUEST:   'SEND_FRIENDSHIP_REQUEST',
  ACCEPT_FRIENDSHIP_REQUEST: 'ACCEPT_FRIENDSHIP_REQUEST',
  REMOVE_FRIENDSHIP:         'REMOVE_FRIENDSHIP'
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveFriendships = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.RECEIVE_FRIENDSHIPS, data: data };
};

export const sendFriendshipRequest = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.SEND_FRIENDSHIP_REQUEST, data: data };
};

export const acceptFriendshipRequest = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.ACCEPT_FRIENDSHIP_REQUEST, data: data };
};

export const removeFriendship = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.REMOVE_FRIENDSHIP, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const getFriendships = (authToken, firebaseUserObj, friendType) => (dispatch) => {
  return APIUtility.get(authToken, '/friendships/' + friendType)
    .then((friends) => {
      dispatch(receiveFriendships({ friends: friends, friendType: friendType }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getFriendships, friendType));
      }

      throw setErrorDescription(error, 'GET friendships failed');
    });
};

export const createFriendRequest = (authToken, firebaseUserObj, userId) => (dispatch) => {
  return APIUtility.post(authToken, '/friendships', { requestee_id: userId })
    .then((friendship) => {
      amplitude.logEvent('Friendship - Request Friendship', { is_successful: true });
      dispatch(sendFriendshipRequest({ friendship: friendship }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createFriendRequest, userId));
      }

      error = setErrorDescription(error, 'POST for create friend request failed');
      amplitude.logEvent('Friendship - Request Friendship', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

export const acceptFriendRequest = (authToken, firebaseUserObj, userId) => (dispatch) => {
  return APIUtility.put(authToken, '/friendships/accept', { requester_id: userId })
    .then((friendship) => {
      amplitude.logEvent('Friendship - Accept Friendship', { is_successful: true });
      return friendship;
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, acceptFriendRequest, userId));
      }

      error = setErrorDescription(error, 'PUT for accept friend request failed');
      amplitude.logEvent('Friendship - Accept Friendship', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

export const deleteFriendship = (authToken, firebaseUserObj, userId) => (dispatch) => {
  return APIUtility.del(authToken, '/friendships/' + userId)
    .then((friendship) => {
      amplitude.logEvent('Friendship - Delete Friendship', { is_successful: true });
      return friendship;
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteFriendship, userId));
      }

      error = setErrorDescription(error, 'DEL friendship failed');
      amplitude.logEvent('Friendship - Delete Friendship', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};
