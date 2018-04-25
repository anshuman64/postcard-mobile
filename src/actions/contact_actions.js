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
  RECEIVE_CONTACTS:       'RECEIVE_CONTACTS',
  RECEIVE_OTHER_CONTACTS: 'RECEIVE_OTHER_CONTACTS',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// contacts (array): array of cleaned contact objects
export const receiveContacts = (data) => {
  return { type: CONTACT_ACTION_TYPES.RECEIVE_CONTACTS, data: data };
};

// phoneNumbersWithAccounts (array): array of phoneNumbers that have temp Postcard account
// phoneNumbersWithoutAccounts (array): array of phoneNumbers without temp Postcard account
export const receiveOtherContacts = (data) => {
  return { type: CONTACT_ACTION_TYPES.RECEIVE_OTHER_CONTACTS, data: data };
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

export const getOtherContacts = (authToken, firebaseUserObj, contactPhoneNumbers) => (dispatch) => {
    return APIUtility.post(authToken, '/contacts', { phone_numbers: contactPhoneNumbers })
      .then((phoneNumbers) => {
        dispatch(receiveOtherContacts({ phoneNumbersWithAccounts: phoneNumbers.phone_numbers_with_accounts, phoneNumbersWithoutAccounts: phoneNumbers.phone_numbers_without_accounts }));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshAuthToken(firebaseUserObj, getOtherContacts, contactPhoneNumbers));
        }

        throw setErrorDescription(error, 'POST other contacts failed');
      });
};
