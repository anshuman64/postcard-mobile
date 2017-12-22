// Library Imports
import Firebase from 'react-native-firebase';

// Local Imports
import * as APIUtility from '../utilities/api_utility.js';

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
  return Firebase.auth().signInWithEmailAndPassword(email, password)
    .then((firebaseUserObj) => {
      return dispatch(loginUser(firebaseUserObj));
    }, (error) => {
      Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((firebaseUserObj) => {
          return dispatch(loginUser(firebaseUserObj));
        })
        .catch((error) => {
          if (!error.description) {
            error.description = 'Firebase email sign-in failed'
          }

          throw error;
        });
      }
    )
}

export const getConfirmationCode = (phoneNumber) => (dispatch) => {
  return Firebase.auth().signInWithPhoneNumber(phoneNumber)
    .then((confirmationCodeObj) => {
      dispatch(receivePhoneNumber(phoneNumber));
      dispatch(receiveConfirmationCodeObj(confirmationCodeObj));
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'Firebase phone sign-in failed'
      }

      throw error;
    });
};

export const verifyConfirmationCode = (confirmationCodeObj, inputtedCode) => (dispatch) => {
  return confirmationCodeObj.confirm(inputtedCode)
    .then((firebaseUserObj) => {
      return dispatch(loginUser(firebaseUserObj));
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'Firebase code verification failed'
      }

      throw error;
    });
};

export const loginUser = (firebaseUserObj) => (dispatch) => {
  let handleExistingUser = (authToken) => {
    return APIUtility.get(authToken, '/users')
      .then((user) => {
        dispatch(receiveUser(user));
      })
      .catch((error) => {
        return handleNewUser(authToken);
      });
  };

  let handleNewUser = (authToken) => {
    return APIUtility.post(authToken, '/users', { phone_number: phoneNumber })
      .then((newUser) => {
        dispatch(receiveUser(newUser));
      })
      .catch((error) => {
        if (!error.description) {
          error.description = 'POST or GET user failed'
        }

        throw error;
      })
  };

  let phoneNumber = firebaseUserObj._user.phoneNumber ? firebaseUserObj._user.phoneNumber : firebaseUserObj._user.email;

  dispatch(receivePhoneNumber(phoneNumber));
  dispatch(receiveFirebaseUserObj(firebaseUserObj));
  return firebaseUserObj.getIdToken(true)
    .then((authToken) => {
      dispatch(receiveAuthToken(authToken));
      return handleExistingUser(authToken);
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'Firebase getIdToken failed'
      }

      throw error;
    });
}
