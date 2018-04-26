// Local Imports
import { amplitude }           from '../utilities/analytics_utility';
import * as APIUtility         from '../utilities/api_utility';
import { getDataFromContacts } from '../utilities/file_utility';
import { setErrorDescription } from '../utilities/error_utility';
import { refreshAuthToken }    from './client_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const CONTACT_ACTION_TYPES = {
  RECEIVE_CONTACTS:               'RECEIVE_CONTACTS',
  RECEIVE_CONTACTS_WITH_ACCOUNTS: 'RECEIVE_CONTACTS_WITH_ACCOUNTS',
  RECEIVE_OTHER_CONTACTS:         'RECEIVE_OTHER_CONTACTS',
  RECEIVE_INVITED_CONTACT:        'RECEIVE_INVITED_CONTACT'
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// contacts (array): array of cleaned contact objects
export const receiveContacts = (data) => {
  return { type: CONTACT_ACTION_TYPES.RECEIVE_CONTACTS, data: data };
};

// contactsWithAccounts (array): array of users from contacts that haven't logged in before
export const receiveContactsWithAccounts = (data) => {
  return { type: CONTACT_ACTION_TYPES.RECEIVE_CONTACTS_WITH_ACCOUNTS, data: data };
};

// otherPhoneNumbers (array): array of phoneNumbers that don't have accounts on Postcard
export const receiveOtherContacts = (data) => {
  return { type: CONTACT_ACTION_TYPES.RECEIVE_OTHER_CONTACTS, data: data };
};

// phoneNumber (string): phoneNumber that was invited
export const receiveInvitedContact = (data) => {
  return { type: CONTACT_ACTION_TYPES.RECEIVE_INVITED_CONTACT, data: data };
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
  return APIUtility.post(authToken, '/contacts', { phone_numbers: contactPhoneNumbers })
    .then((contactsWithAccounts) => {
      dispatch(receiveContactsWithAccounts({ contacts: contactsWithAccounts }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getContactsWithAccounts, contactPhoneNumbers));
      }

      throw setErrorDescription(error, 'POST contacts with accounts failed');
    });
}

export const getOtherContacts = (authToken, firebaseUserObj, contactPhoneNumbers) => (dispatch) => {
    return APIUtility.post(authToken, '/contacts/other', { phone_numbers: contactPhoneNumbers })
      .then((otherPhoneNumbers) => {
        dispatch(receiveOtherContacts({ otherPhoneNumbers: otherPhoneNumbers }));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshAuthToken(firebaseUserObj, getOtherContacts, contactPhoneNumbers));
        }

        throw setErrorDescription(error, 'POST other contacts failed');
      });
};


export const inviteContact = (authToken, firebaseUserObj, contactPhoneNumber) => (dispatch) => {
    return APIUtility.post(authToken, '/contacts/invite', { phone_number: contactPhoneNumber })
      .then(() => {
        dispatch(receiveInvitedContact({ phoneNumber: contactPhoneNumber }));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshAuthToken(firebaseUserObj, inviteContact, contactPhoneNumber));
        }

        throw setErrorDescription(error, 'POST invite contact failed');
      });
};
