// Library Imports
import Firebase from 'react-native-firebase';

// Local Imports
import * as APIUtility                        from '../utilities/api_utility';
import { toConfirmCodeScreen, toPostsScreen } from './navigation_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const USER_ACTION_TYPES = {
  RECEIVE_PHONE_NUMBER:          'RECEIVE_PHONE_NUMBER',
  RECEIVE_CONFIRMATION_CODE_OBJ: 'RECEIVE_CONFIRMATION_CODE_OBJ',
  RECEIVE_FIREBASE_USER_OBJ:     'RECEIVE_FIREBASE_USER_OBJ',
  RECEIVE_AUTH_TOKEN:            'RECEIVE_AUTH_TOKEN',
  RECEIVE_USER:                  'RECEIVE_USER'
};


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receivePhoneNumber = (data) => {
  return { type: USER_ACTION_TYPES.RECEIVE_PHONE_NUMBER, data: data };
}

export const receiveConfirmationCodeObj = (data) => {
  return { type: USER_ACTION_TYPES.RECEIVE_CONFIRMATION_CODE_OBJ, data: data };
};

export const receiveFirebaseUserObj = (data) => {
  return { type: USER_ACTION_TYPES.RECEIVE_FIREBASE_USER_OBJ, data: data };
};

export const receiveUser = (data) => {
  return { type: USER_ACTION_TYPES.RECEIVE_USER, data: data}
}

export const receiveAuthToken = (data) => {
  return { type: USER_ACTION_TYPES.RECEIVE_AUTH_TOKEN, data: data }
}


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// LoginScreen: Updates global state with inputted phone number and made up confirmation code (as a string)
// export const debugGetConfirmationCode = (phoneNumber) => (dispatch) => {
//     return new Promise(() => dispatch(receiveConfirmationCodeObj({phoneNumber: phoneNumber, confirmationCodeObj: '123456'})));
// };

// LoginScreen: Same as getConfirmationCodeAndChangeScreens, without transition to ConfirmationCodeScreen; used for Resend SMS button on ConfirmationCodeScreen
export const getConfirmationCode = (phoneNumber) => (dispatch) => {
  return Firebase.auth().signInWithPhoneNumber(phoneNumber)
    .then((confirmationCodeObj) => {
      dispatch(receivePhoneNumber({phoneNumber: phoneNumber}));
      dispatch(receiveConfirmationCodeObj({confirmationCodeObj: confirmationCodeObj}));
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
    });
}

// LoadingScreen: Tries to auto log in user
export const getUserOnAuthStateChange = (callback) => (dispatch) => {
  return Firebase.auth().onAuthStateChanged(callback);
}

export const findUser = (authToken) => (dispatch) => {
  return APIUtility.get(authToken, '/users')
    .then((user) => {
      dispatch(receiveUser(user));
    });
}

export const createUser = (authToken, userCreds) => (dispatch) => {
  return APIUtility.post(authToken, '/users', userCreds)
    .then((newUser) => {
      dispatch(receiveUser(newUser));
    });
}
