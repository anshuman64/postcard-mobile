// Local Imports
import * as UserAPI                            from '../api/user_api.js';
import { toConfirmCodeScreen, toPostsScreen }  from './navigation_actions.js';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const RECEIVE_PHONE_NUMBER       = 'RECEIVE_PHONE_NUMBER';
export const RECEIVE_CONFIRMATION_CODE  = 'RECEIVE_CONFIRMATION_CODE';
export const RECEIVE_FIREBASE_USER_OBJ  = 'RECEIVE_FIREBASE_USER_OBJ';
export const RECEIVE_AUTH_TOKEN         = 'RECEIVE_AUTH_TOKEN';
export const RECEIVE_USER               = 'RECEIVE_USER';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receivePhoneNumber = (data) => {
  return { type: RECEIVE_PHONE_NUMBER, data: data };
}

export const receiveConfirmationCode = (data) => {
  return { type: RECEIVE_CONFIRMATION_CODE, data: data };
};

export const receiveFirebaseUserObj = (data) => {
  return { type: RECEIVE_FIREBASE_USER_OBJ, data: data };
};

export const receiveUser = (data) => {
  return { type: RECEIVE_USER, data: data}
}

export const receiveAuthToken = (data) => {
  return { type: RECEIVE_AUTH_TOKEN, data: data }
}


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// LoginScreen: Updates global state with inputted phone number and made up confirmation code (as a string)
export const debugGetConfirmationCode = (phoneNumber) => (dispatch) => {
    return new Promise(() => dispatch(receiveConfirmationCode({phoneNumber: phoneNumber, confirmationCodeObj: '123456'})));
};

// LoginScreen: Same as getConfirmationCodeAndChangeScreens, without transition to ConfirmationCodeScreen; used for Resend SMS button on ConfirmationCodeScreen
export const getConfirmationCode = (phoneNumber) => (dispatch) => {
  return UserAPI.getConfirmationCode(phoneNumber)
    .then((confirmationCodeObj) => {
      dispatch(receivePhoneNumber({phoneNumber: phoneNumber}));
      dispatch(receiveConfirmationCode({confirmationCodeObj: confirmationCodeObj}));
    });
};

// ConfirmCodeScreen: Verifies inputted confirmation code and updates global store with returned firebaseUserObj; transitions to PostsScreen
export const verifyConfirmationCode = (confirmationCodeObj, inputtedCode) => (dispatch) => {
  return confirmationCodeObj.confirm(inputtedCode)
    .then((firebaseUserObj) => {
      dispatch(receiveFirebaseUserObj({firebaseUserObj: firebaseUserObj}));
    });
};

export const getAuthToken = (firebaseUserObj) => (dispatch) => {
  return firebaseUserObj.getIdToken(true)
    .then((authToken) => {
      dispatch(receiveAuthToken({authToken: authToken}));
    })
}

export const createUser = (phoneNumber, authToken) => (dispatch) => {
  return UserAPI.createUser({phoneNumber: phoneNumber}, authToken)
    .then((user) => {
      dispatch(receiveUser({user: user}));
    })
}

// LoadingScreen: Tries to auto log in user
export const getUserOnAuthStateChange = (callback) => (dispatch) => {
  return UserAPI.getUserOnAuthStateChange(callback)
}
