// Library Imports
import _ from 'lodash';

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
  RECEIVE_GROUPS:            'RECEIVE_GROUPS',
  RECEIVE_GROUP:             'RECEIVE_GROUP',
  EDIT_GROUP:                'EDIT_GROUP',
  REMOVE_GROUP:              'REMOVE_GROUP',
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
// contactPhoneNumbers (array): array of phoneNumbers to unshift from contactsWithAccounts
export const receiveGroup = (data) => {
  return { type: GROUP_ACTION_TYPES.RECEIVE_GROUP, data: data };
};

// group (group object): group object of created group
// contactPhoneNumbers (array): array of phoneNumbers to unshift from contactsWithAccounts
export const editGroup = (data) => {
  return { type: GROUP_ACTION_TYPES.EDIT_GROUP, data: data };
};

// users (array): array of users in group
export const receiveUsersFromGroups = (data) => {
  return { type: GROUP_ACTION_TYPES.RECEIVE_USERS_FROM_GROUPS, data: data };
};

// groupId (int): id of destroyed group
export const removeGroup = (data) => {
  return { type: GROUP_ACTION_TYPES.REMOVE_GROUP, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// Creates group with list of user_ids
// TODO: revise amplitude names
export const createGroup = (authToken, firebaseUserObj, userIds, contactPhoneNumbers) => (dispatch) => {
  return APIUtility.post(authToken, '/groups', { user_ids: userIds, contact_phone_numbers: contactPhoneNumbers })
    .then((newGroup) => {
      amplitude.logEvent('Groups - Create Group', { is_successful: true, num_users: userIds.length, num_contacts: contactPhoneNumbers.length });
      dispatch(receiveGroup({ group: newGroup, contactPhoneNumbers: contactPhoneNumbers }));
      dispatch(getUsersFromGroups(newGroup));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createGroup, userIds, contactPhoneNumbers));
      }

      if (error.message === 'Minimum 2 user_ids required') {
        error = setErrorDescription(error, 'Minimum 2 user_ids required');
      } else {
        error = setErrorDescription(error, 'POST groups failed');
      }

      amplitude.logEvent('Groups - Create Group', { is_successful: false, num_users: userIds.length, num_contacts: contactPhoneNumbers.length, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// PUT request to API to edit group name from GroupMenuScreen
export const editGroupName = (authToken, firebaseUserObj, groupId, name) => (dispatch) => {
  return APIUtility.put(authToken, '/groups', { group_id: -1 * groupId, name: name })
  .then((editedGroup) => {
    amplitude.logEvent('Groups - Edit Name', { is_successful: true, name: name });
    dispatch(editGroup({ group: editedGroup }));
  })
  .catch((error) => {
    if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
      return dispatch(refreshAuthToken(firebaseUserObj, editGroupName, groupId, name));
    }

    error = setErrorDescription(error, 'PUT group for name failed');
    amplitude.logEvent('Groups - Edit Name', { is_successful: false, name: name, error_description: error.description, error_message: error.message });
    throw error;
  });
}

// POST request to API to add group member from AddGroupMembersScreen
export const addGroupMembers = (authToken, firebaseUserObj, groupId, userIds, contactPhoneNumbers) => (dispatch) => {
  return APIUtility.post(authToken, '/groups/add', { group_id: -1 * groupId, user_ids: userIds, contact_phone_numbers: contactPhoneNumbers })
  .then((editedGroup) => {
    amplitude.logEvent('Groups - Add Members', { is_successful: true });
    dispatch(editGroup({ group: editedGroup, contactPhoneNumbers: contactPhoneNumbers }));
  })
  .catch((error) => {
    if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
      return dispatch(refreshAuthToken(firebaseUserObj, addGroupMembers, groupId, userIds, contactPhoneNumbers));
    }

    error = setErrorDescription(error, 'POST group to add members failed');
    amplitude.logEvent('Groups - Add Members', { is_successful: false, error_description: error.description, error_message: error.message });
    throw error;
  });
}

// DEL request to API to remove member from group
export const removeGroupMember = (authToken, firebaseUserObj, groupId, userId, isClient) => (dispatch) => {
  return APIUtility.del(authToken, '/groups/' + -1 * groupId + '/' + userId)
  .then((editedGroup) => {
    if (isClient) {
      amplitude.logEvent('Groups - Leave Group', { is_successful: true });
      dispatch(removeGroup({ group: editedGroup }));
    } else {
      amplitude.logEvent('Groups - Remove Member', { is_successful: true });
      dispatch(editGroup({ group: editedGroup }));
    }
  })
  .catch((error) => {
    if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
      return dispatch(refreshAuthToken(firebaseUserObj, removeGroupMember, groupId, userId));
    }

    error = setErrorDescription(error, 'DEL group member failed');

    if (isClient) {
      amplitude.logEvent('Groups - Leave Group', { is_successful: false, error_description: error.description, error_message: error.message });
    } else {
      amplitude.logEvent('Groups - Remove Member', { is_successful: false, error_description: error.description, error_message: error.message });
    }

    throw error;
  });
}

// Deletes group
export const deleteGroup = (authToken, firebaseUserObj, groupId) => (dispatch) => {
  return APIUtility.del(authToken, '/groups/' + -1 * groupId)
    .then((deletedGroup) => {
      amplitude.logEvent('Groups - Delete Group', { is_successful: true });
      dispatch(removeGroup({ groupId: deletedGroup.id }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deleteGroup, groupId));
      }

      error = setErrorDescription(error, 'DEL group failed');
      amplitude.logEvent('Groups - Delete Group', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Gets user info from groups for rendering username, avatar_url, etc.
export const getUsersFromGroups = (object) => (dispatch) => {
  let users = [];

  if (Array.isArray(object)) {
    _.forEach(object, (obj) => {
      users = users.concat(obj.users);
    });
  } else {
    users = users.concat(object.users);
  }

  dispatch(receiveUsersFromGroups({ users: users }));
  dispatch(getImages(users));
}
