// Local Imports
import { amplitude }                                  from '../utilities/analytics_utility';
import * as APIUtility                                from '../utilities/api_utility';
import { getDataFromContacts }                        from '../utilities/file_utility';
import { setErrorDescription, refreshTokenAndResume } from '../utilities/error_utility';

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
      error = setErrorDescription(error, 'GET contacts failed');
      amplitude.logEvent('Contacts - Get Contacts', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
}

export const getContactsWithAccounts = (authToken, firebaseUserObj, contactPhoneNumbers) => (dispatch) => {
  return APIUtility.post(authToken, '/contacts', { phone_numbers: contactPhoneNumbers })
    .then((contactsWithAccounts) => {
      dispatch(receiveContactsWithAccounts({ contacts: contactsWithAccounts }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshTokenAndResume(firebaseUserObj, getContactsWithAccounts, contactPhoneNumbers));
      }

      error = setErrorDescription(error, 'POST contacts with accounts failed');
      amplitude.logEvent('Contacts - Get Contacts with Accounts', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
}

export const getOtherContacts = (authToken, firebaseUserObj, contactPhoneNumbers) => (dispatch) => {
    return APIUtility.post(authToken, '/contacts/other', { phone_numbers: contactPhoneNumbers })
      .then((otherPhoneNumbers) => {
        dispatch(receiveOtherContacts({ otherPhoneNumbers: otherPhoneNumbers }));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshTokenAndResume(firebaseUserObj, getOtherContacts, contactPhoneNumbers));
        }

        error = setErrorDescription(error, 'POST other contacts failed');
        amplitude.logEvent('Contacts - Get Other Contacts', { is_successful: false, error_description: error.description, error_message: error.message });
        throw error;
      });
};


export const inviteContact = (authToken, firebaseUserObj, contactPhoneNumber) => (dispatch) => {
    return APIUtility.post(authToken, '/contacts/invite', { phone_number: contactPhoneNumber })
      .then(() => {
        dispatch(receiveInvitedContact({ phoneNumber: contactPhoneNumber }));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshTokenAndResume(firebaseUserObj, inviteContact, contactPhoneNumber));
        }

        error = setErrorDescription(error, 'POST invite contact failed');
        amplitude.logEvent('Contacts - Invite Contact', { is_successful: false, error_description: error.description, error_message: error.message });
        throw error;
      });
};
