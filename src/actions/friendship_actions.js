// Local Imports
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';
import { refreshAuthToken }    from './client_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const FRIENDSHIP_ACTION_TYPES = {
  RECEIVE_FRIENDSHIP: 'RECEIVE_FRIENDSHIP',
  REMOVE_FRIENDSHIP:  'REMOVE_FRIENDSHIP'
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveFriendRequest = (data) => {
  return { type: FRIENDSHIP_ACTION_TYPES.RECEIVE_FRIEND_REQUEST, data: data };
};

// export const receiveFriendship = (data) => {
//   return { type: FRIENDSHIP_ACTION_TYPES.RECEIVE_FRIENDSHIP, data: data };
// };
//
// export const removeFriendship = (data) => {
//   return { type: FRIENDSHIP_ACTION_TYPES.REMOVE_FRIENDSHIP, data: data };
// };

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// export const getFriends = (authToken, firebaseUserObj, userId, postId) => (dispatch) => {
//   return APIUtility.post(authToken, '/likes', { post_id: postId })
//     .then((newFriendship) => {
//       amplitude.logEvent('Friendship - Click Friendship', { is_successful: true, is_create: true });
//       dispatch(receiveFriendship({ like: newFriendship, userId: userId }));
//     })
//     .catch((error) => {
//       if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
//         return dispatch(refreshAuthToken(firebaseUserObj, createFriendship, userId, postId));
//       }
//
//       error = setErrorDescription(error, 'POST like failed');
//       amplitude.logEvent('Friendship - Click Friendship', { is_successful: false, is_create: true, error_description: error.description, error_message: error.message });
//       throw error;
//     });
// };

export const createFriendRequest = (authToken, firebaseUserObj, userId) => (dispatch) => {
  return APIUtility.post(authToken, '/friendships', { requestee_id: userId })
    .then((requestedUser) => {
      amplitude.logEvent('Friendship - Request Friendship', { is_successful: true });
      dispatch(receiveFriendRequest({ user: requestedUser }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(createFriendRequest(firebaseUserObj, createFriendship, userId));
      }

      error = setErrorDescription(error, 'POST for create friend request failed');
      amplitude.logEvent('Friendship - Request Friendship', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};


// export const acceptFriendRequest = (authToken, firebaseUserObj, userId, postId) => (dispatch) => {
//   return APIUtility.post(authToken, '/likes', { post_id: postId })
//     .then((newFriendship) => {
//       amplitude.logEvent('Friendship - Click Friendship', { is_successful: true, is_create: true });
//       dispatch(receiveFriendship({ like: newFriendship, userId: userId }));
//     })
//     .catch((error) => {
//       if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
//         return dispatch(refreshAuthToken(firebaseUserObj, createFriendship, userId, postId));
//       }
//
//       error = setErrorDescription(error, 'POST like failed');
//       amplitude.logEvent('Friendship - Click Friendship', { is_successful: false, is_create: true, error_description: error.description, error_message: error.message });
//       throw error;
//     });
// };

// export const destroyFriendship = (authToken, firebaseUserObj, userId, postId) => (dispatch) => {
//   return APIUtility.post(authToken, '/likes', { post_id: postId })
//     .then((newFriendship) => {
//       amplitude.logEvent('Friendship - Click Friendship', { is_successful: true, is_create: true });
//       dispatch(receiveFriendship({ like: newFriendship, userId: userId }));
//     })
//     .catch((error) => {
//       if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
//         return dispatch(refreshAuthToken(firebaseUserObj, createFriendship, userId, postId));
//       }
//
//       error = setErrorDescription(error, 'POST like failed');
//       amplitude.logEvent('Friendship - Click Friendship', { is_successful: false, is_create: true, error_description: error.description, error_message: error.message });
//       throw error;
//     });
// };
