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


export const debugSignIn = (email, password) => (dispatch) => {
  let handleExistingUser = (authToken) => {
    console.log('handleExisting')
    return APIUtility.get(authToken, '/users')
      .then((user) => {
        dispatch(receiveUser(user));
      }/*, handleNewUser(authToken)*/);
  };

  let handleNewUser = (authToken) => {
    console.log('handleNew')
    return APIUtility.post(authToken, '/users', { phone_number: email })
      .then((newUser) => {
        dispatch(receiveUser(newUser));
      });
  };

  return Firebase.auth().signInWithEmailAndPassword(email, password)
    .then((firebaseUserObj) => {
      dispatch(receivePhoneNumber(firebaseUserObj._user.email));
      dispatch(receiveFirebaseUserObj(firebaseUserObj));
      return firebaseUserObj.getIdToken(true);
    }).then((authToken) => {
      dispatch(receiveAuthToken(authToken));
      return handleExistingUser(authToken);
    });
}

export const getConfirmationCode = (phoneNumber) => (dispatch) => {
  return Firebase.auth().signInWithPhoneNumber(phoneNumber)
    .then((confirmationCodeObj) => {
      dispatch(receivePhoneNumber(phoneNumber));
      dispatch(receiveConfirmationCodeObj(confirmationCodeObj));
    });
};

export const verifyConfirmationCode = (phoneNumber, confirmationCodeObj, inputtedCode) => (dispatch) => {
  let handleExistingUser = (authToken) => {
    console.log('handleExisting')
    return APIUtility.get(authToken, '/users')
      .then((user) => {
        debugger;
        dispatch(receiveUser(user));
      }, handleNewUser(authToken));
  };

  let handleNewUser = (authToken) => {
    console.log('handleNew')
    return APIUtility.post(authToken, '/users', { phone_number: phoneNumber })
      .then((newUser) => {
        debugger;
        dispatch(receiveUser(newUser));
      }, (error) => console.error(error));
  };

  return confirmationCodeObj.confirm(inputtedCode)
    .then((firebaseUserObj) => {
      dispatch(receiveFirebaseUserObj(firebaseUserObj));
      return firebaseUserObj.getIdToken(true);
    }).then((authToken) => {
      dispatch(receiveAuthToken(authToken));
      return handleExistingUser(authToken);
    });
};

export const attemptToLoginUser = () => (dispatch) => {
  let listener = (firebaseUserObj) => {
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
