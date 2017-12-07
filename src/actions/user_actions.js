// Local Imports
import * as UserAPI                            from '../api/user_api.js';
import { toConfirmCodeScreen, toPostsScreen }  from './navigation_actions.js';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const RECEIVE_CONFIRMATION_CODE  = 'RECEIVE_CONFIRMATION_CODE';
export const RECEIVE_USER               = 'RECEIVE_USER';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveConfirmationCode = (data) => {
  return { type: RECEIVE_CONFIRMATION_CODE, data: data };
};

export const receiveUser = (data) => {
  return { type: RECEIVE_USER, data: data };
};


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// LoginScreen: Updates global state with inputted phone number and made up confirmation code (as a string)
export const debugGetConfirmationCode = (phoneNumber) => (dispatch) => {
    dispatch(receiveConfirmationCode({phoneNumber: phoneNumber, confirmationCodeObj: '123456'}));
    dispatch(toConfirmCodeScreen());
};

// LoginScreen: Sends inputted phone number to Firebase API to retrieve confirmation code; updates global store with inputted phone number and confirmationCodeObj; transitions to ConfirmCodeScreen
export const getConfirmationCodeAndChangeScreens = (phoneNumber) => (dispatch) => {
  return UserAPI.getConfirmationCode(phoneNumber)
    .then((confirmationCodeObj) => {
      dispatch(receiveConfirmationCode({phoneNumber: phoneNumber, confirmationCodeObj: confirmationCodeObj}));
      dispatch(toConfirmCodeScreen());
    });
};

// LoginScreen: Same as getConfirmationCodeAndChangeScreens, without transition to ConfirmationCodeScreen; used for Resend SMS button on ConfirmationCodeScreen
export const getConfirmationCode = (phoneNumber) => (dispatch) => {
  return UserAPI.getConfirmationCode(phoneNumber)
    .then((confirmationCodeObj) => {
      dispatch(receiveConfirmationCode({phoneNumber: phoneNumber, confirmationCodeObj: confirmationCodeObj}));
    });
};

// ConfirmCodeScreen: Verifies inputted confirmation code and updates global store with returned firebaseUserObj; transitions to PostsScreen
export const verifyConfirmationCode = (confirmationCodeObj, inputtedCode) => (dispatch) => {
  return confirmationCodeObj.confirm(inputtedCode)
    .then((firebaseUserObj) => {
      dispatch(receiveUser({firebaseUserObj: firebaseUserObj}));
      dispatch(toPostsScreen());
    });
};
