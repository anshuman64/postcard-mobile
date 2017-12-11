// Library Imports
import Firebase from 'react-native-firebase';

// Local Imports
import * as APIUtility from '../utilities/api_utility';

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
};

export const receiveConfirmationCodeObj = (data) => {
  return { type: USER_ACTION_TYPES.RECEIVE_CONFIRMATION_CODE_OBJ, data: data };
};

export const receiveFirebaseUserObj = (data) => {
  return { type: USER_ACTION_TYPES.RECEIVE_FIREBASE_USER_OBJ, data: data };
};

export const receiveAuthToken = (data) => {
  return { type: USER_ACTION_TYPES.RECEIVE_AUTH_TOKEN, data: data }
};

export const receiveUser = (data) => {
  return { type: USER_ACTION_TYPES.RECEIVE_USER, data: data }
};


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//


// LoginScreen: Updates global state with inputted phone number and made up confirmation code (as a string)
// export const debugGetConfirmationCode = (phoneNumber) => (dispatch) => {
//     return new Promise(() => dispatch(receiveConfirmationCodeObj({phoneNumber: phoneNumber, confirmationCodeObj: '123456'})));
// };

export const getConfirmationCode = (phoneNumber) => (dispatch) => {
  return Firebase.auth().signInWithPhoneNumber(phoneNumber)
    .then((confirmationCodeObj) => {
      dispatch(receivePhoneNumber(phoneNumber));
      dispatch(receiveConfirmationCodeObj(confirmationCodeObj));
    });
};

export const verifyConfirmationCode = (phoneNumber, confirmationCodeObj, inputtedCode) => (dispatch) => {
  let handleExistingUser = () => {
    return APIUtility.get(authToken, '/users')
      .then((user) => {
        dispatch(receiveUser(user));
      });
  };

  let handleNewUser = () => {
    return APIUtility.post(authToken, '/users', { phone_number: phoneNumber })
      .then((newUser) => {
        dispatch(receiveUser(newUser));
      });
  };

  return confirmationCodeObj.confirm(inputtedCode)
    .then((firebaseUserObj) => {
      dispatch(receiveFirebaseUserObj(firebaseUserObj));
      return firebaseUserObj.getIdToken(true);
    }).then((authToken) => {
      dispatch(receiveAuthToken(authToken));
      return Firebase.auth().verifyPhoneNumber(phoneNumber);
    }).then(handleExistingUser, handleNewUser);
};

export const attemptToLoginUser = () => (dispatch) => {
  let listener = (firebaserUserObj) => {
    if (firebaseUserObj) {
      dispatch(receivePhoneNumber(firebaseUserObj._user.phoneNumber));
      dispatch(receiveFirebaseUserObj(firebaseUserObj));

      return firebaseUserObj.getIdToken(true)
        .then((authToken) => {
          dispatch(receiveAuthToken(authToken));
          return APIUtility.get(authToken, '/users');
        }).then((user) => {
          dispatch(receiveUser(user));
        });
    } else {
      return Promise.reject();
    }
  };

  return Firebase.auth().onAuthStateChanged(listener);
};
