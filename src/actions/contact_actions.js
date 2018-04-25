// Local Imports
import { amplitude }           from '../utilities/analytics_utility';
import * as APIUtility         from '../utilities/api_utility';
import { getDataFromContacts } from '../utilities/file_utility';
import { refreshAuthToken }    from './client_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const CONTACT_ACTION_TYPES = {
  RECEIVE_CONTACTS: 'RECEIVE_CONTACTS',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// contacts (array): array of cleaned contact objects
export const receiveContacts = (data) => {
  return { type: CONTACT_ACTION_TYPES.RECEIVE_CONTACTS, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const getContacts = (clientPhoneNumber) => (dispatch) => {
  return getDataFromContacts(clientPhoneNumber)
    .then((contacts) => {
      dispatch(receiveContacts({ contacts: contacts }));
    })
    .catch((error) => {
      console.error(error); // Debug Test
    });
}

export const getContactsWithAccounts = (authToken, firebaseUserObj, contactPhoneNumbers) => (dispatch) => {
    return APIUtility.post(authToken, '/contacts', { contacts: contactPhoneNumbers })
      .then((friends) => {
        dispatch(receiveFriendships({ friends: friends, friendType: FRIEND_TYPES.CONTACTS }));
        dispatch(getImages(friends));
        dispatch(getPostsFromMessages(friends));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshAuthToken(firebaseUserObj, getFriendsFromContacts, contactPhoneNumbers));
        }

        throw setErrorDescription(error, 'POST friends from contacts failed');
      });
};
