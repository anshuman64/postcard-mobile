// Local Imports
import { amplitude }            from '../utilities/analytics_utility';
import * as APIUtility          from '../utilities/api_utility';
import { setErrorDescription }  from '../utilities/error_utility';
import { refreshAuthToken }     from './client_actions';
import { getImages }            from './image_actions';

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
  RECEIVE_FRIENDSHIPS:                'RECEIVE_FRIENDSHIPS',
  SEND_FRIENDSHIP_REQUEST:            'SEND_FRIENDSHIP_REQUEST',
  ACCEPT_FRIENDSHIP_REQUEST:          'ACCEPT_FRIENDSHIP_REQUEST',
  REMOVE_FRIENDSHIP:                  'REMOVE_FRIENDSHIP',
  PUSHER_CREATE_FRIENDSHIP:           'PUSHER_CREATE_FRIENDSHIP',
  PUSHER_RECEIVE_FRIENDSHIP:          'PUSHER_RECEIVE_FRIENDSHIP',
  PUSHER_RECEIVE_ACCEPTED_FRIENDSHIP: 'PUSHER_RECEIVE_ACCEPTED_FRIENDSHIP',
  PUSHER_DESTROY_FRIENDSHIP:          'PUSHER_DESTROY_FRIENDSHIP',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

/*
friends (array): array of user objects
friendType (string): FRIEND_TYPE of array
*/
export const receiveFriendships = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.RECEIVE_FRIENDSHIPS, data: data };
};

/*
friendship (friendship object): friendship object of created friendship
*/
export const sendFriendshipRequest = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.SEND_FRIENDSHIP_REQUEST, data: data };
};

/*
friendship (friendship object): friendship object of accepted friendship
*/
export const acceptFriendshipRequest = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.ACCEPT_FRIENDSHIP_REQUEST, data: data };
};

/*
TODO: why is client necessary?
friendship (friendship object): friendship object of removed friendship
client (user object): user object of client
*/
export const removeFriendship = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.REMOVE_FRIENDSHIP, data: data };
};

/*
TODO: fix client definition to actually be front-end client
client (user object): client's user object
user (user object): other user's user object
friendship (friendship object): joint friendship object
*/
export const pusherCreateFriendship = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.PUSHER_CREATE_FRIENDSHIP, data: data };
};

/*
client (user object): client's user object
user (user object): other user's user object
friendship (friendship object): joint friendship object
*/
export const pusherRecieveFriendship = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.PUSHER_RECEIVE_FRIENDSHIP, data: data };
};

/*
client (user object): client's user object
user (user object): other user's user object
friendship (friendship object): joint friendship object
*/
export const pusherReceiveAcceptedFriendship = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.PUSHER_RECEIVE_ACCEPTED_FRIENDSHIP, data: data };
};

/*
client (user object): client's user object
user (user object): other user's user object
friendship (friendship object): joint friendship object
*/
export const pusherDestroyFriendship = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.PUSHER_DESTROY_FRIENDSHIP, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const getFriendships = (authToken, firebaseUserObj, friendType) => (dispatch) => {
  return APIUtility.get(authToken, '/friendships/' + friendType)
    .then((friends) => {
      dispatch(receiveFriendships({ friends: friends, friendType: friendType }));
      dispatch(getImages(friends));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getFriendships, friendType));
      }

      throw setErrorDescription(error, 'GET friendships failed');
    });
};

export const createFriendRequest = (authToken, firebaseUserObj, userId, username) => (dispatch) => {
  return APIUtility.post(authToken, '/friendships', { requestee_id: userId, username: username })
    .then((friendship) => {
      amplitude.logEvent('Friendship - Request Friendship', { is_successful: true, isUsername: username ? true : false });
      dispatch(sendFriendshipRequest({ friendship: friendship }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createFriendRequest, userId, username));
      }

      error = setErrorDescription(error, 'POST for create friend request failed');
      amplitude.logEvent('Friendship - Request Friendship', { is_successful: false, isUsername: username ? true : false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Note: acceptFriendshipRequest should be dispatched in component
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

// Note: removeFriendship should be dispatched in component
export const deleteFriendship = (authToken, firebaseUserObj, userId) => (dispatch) => {
  return APIUtility.del(authToken, '/friendships/' + userId)
    .then((friendship) => {
      amplitude.logEvent('Friendship - Delete Friendship', { is_successful: true, status: friendship.status });
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
