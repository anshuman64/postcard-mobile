// Library Imports
import * as _ from 'lodash';

// Local Imports
import { amplitude }           from '../utilities/analytics_utility';
import * as APIUtility         from '../utilities/api_utility';
import { setErrorDescription } from '../utilities/error_utility';
import { refreshAuthToken }    from './client_actions';
import { getImages }           from './image_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const GROUP_ACTION_TYPES = {
  RECEIVE_GROUPS: 'RECEIVE_GROUPS',
  RECEIVE_GROUP:  'RECEIVE_GROUP',
  REMOVE_GROUP:   'REMOVE_GROUP',
  RECEIVE_USERS_FROM_GROUPS: 'RECEIVE_USERS_FROM_GROUPS',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// groups (array): array of group objects
export const receiveGroups = (data) => {
  return { type: GROUP_ACTION_TYPES.RECEIVE_GROUPS, data: data };
};

// group (group object): group object of created group
export const receiveGroup = (data) => {
  return { type: GROUP_ACTION_TYPES.RECEIVE_GROUP, data: data };
};

// users (array): array of users in group
export const receiveUsersFromGroups = (data) => {
  return { type: GROUP_ACTION_TYPES.RECEIVE_USERS_FROM_GROUPS, data: data };
};

// group (group object): group object of destroyed group
// export const removeGroup = (data) => {
//   return { type: GROUP_ACTION_TYPES.REMOVE_GROUP, data: data };
// };

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// Creates group with list of user_ids
// TODO: revise amplitude names
export const createGroup = (authToken, firebaseUserObj, users) => (dispatch) => {
  return APIUtility.post(authToken, '/groups', { user_ids: users })
    .then((newGroup) => {
      amplitude.logEvent('Groups - Create Group', { is_successful: true, num_users: users.length });
      dispatch(receiveGroup({ group: newGroup }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createGroup, name, users));
      }

      if (error.message === 'Minimum 2 user_ids required') {
        error = setErrorDescription(error, 'Minimum 2 user_ids required');
      } else {
        error = setErrorDescription(error, 'POST groups failed');
      }

      amplitude.logEvent('Groups - Create Group', { is_successful: false, num_users: users.length, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Gets user info for all users in group. Handles the case where one user in group is not your friend
export const getUsersFromGroup = (authToken, firebaseUserObj, convoId) => (dispatch) => {
  let idToSend;
  if (convoId < 0) {
    idToSend = -1 * convoId;
  } else {
    return;
  }

  return APIUtility.get(authToken, '/groups/users/' + idToSend)
    .then((users) => {
      dispatch(receiveUsersFromGroups({ users: users }));
      dispatch(getImages(users));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getUsersFromGroup, convoId));
      }

      throw setErrorDescription(error, 'GET users from group failed');
    });
}

export const getUserFromGroups = (groups) => (dispatch) => {
  let users = [];

  _.forEach(groups, (group) => {
    if (group.peek_message) {
      users.push(group.peek_message.author);
    }
  });

  dispatch(receiveUsersFromGroups({ users: users }));
  dispatch(getImages(users));
}

// Deletes group
// export const deleteGroup = (authToken, firebaseUserObj, groupId) => (dispatch) => {
//   return APIUtility.del(authToken, '/groups/' + groupId)
//     .then((deletedGroup) => {
//       amplitude.logEvent('Groups - Delete Group', { is_successful: true });
//       dispatch(removeGroup({ group: deletedGroup }));
//     })
//     .catch((error) => {
//       if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
//         return dispatch(refreshAuthToken(firebaseUserObj, deleteGroup, groupId));
//       }
//
//       error = setErrorDescription(error, 'DEL group failed');
//       amplitude.logEvent('Groups - Delete Group', { is_successful: false, error_description: error.description, error_message: error.message });
//       throw error;
//     });
// };
