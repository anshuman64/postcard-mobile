// Library Imports
import Firebase from 'react-native-firebase';

// Local Imports
import { amplitude }   from '../utilities/analytics_utility.js';
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
      amplitude.logEvent('Onboarding - Sign In With Phone Number', { is_successful: true });
      amplitude.setUserProperties({ phoneNumber: phoneNumber });

      dispatch(receivePhoneNumber(phoneNumber));
      dispatch(receiveConfirmationCodeObj(confirmationCodeObj));
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'Firebase phone sign-in failed'
      }

      amplitude.logEvent('Onboarding - Sign In With Phone Number', { is_successful: false, error: error.description });
      throw error;
    });
};

export const verifyConfirmationCode = (confirmationCodeObj, inputtedCode) => (dispatch) => {
  return confirmationCodeObj.confirm(inputtedCode)
    .then((firebaseUserObj) => {
      amplitude.logEvent('Onboarding - Verify Confirmation Code', { is_successful: true });
      return dispatch(loginUser(firebaseUserObj));
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'Firebase code verification failed'
      }

      amplitude.logEvent('Onboarding - Verify Confirmation Code', { is_successful: false, error: error.description });
      throw error;
    });
};

export const loginUser = (firebaseUserObj) => (dispatch) => {
  let handleExistingUser = (authToken) => {
    return APIUtility.get(authToken, '/users')
      .then((user) => {
        amplitude.setUserId(user.id);
        amplitude.setUserProperties({ database_id: user.id, phone_number: user.phone_number, firebase_uid: user.firebase_uid, created_at: user.created_at });
        amplitude.logEvent('Onboarding - Log In', { is_successful: true, is_new_user: false });

        dispatch(receiveUser(user));
      }, (error) => {
        return handleNewUser(authToken);
      });
  };

  let handleNewUser = (authToken) => {
    return APIUtility.post(authToken, '/users', { phone_number: phoneNumber })
      .then((newUser) => {
        amplitude.setUserId(newUser.id);
        amplitude.setUserProperties({ database_id: newUser.id, phone_number: newUser.phone_number, firebase_uid: newUser.firebase_uid, created_at: newUser.created_at });
        amplitude.logEvent('Onboarding - Log In', { is_successful: true, is_new_user: true });

        dispatch(receiveUser(newUser));
      })
      .catch((error) => {
        if (!error.description) {
          error.description = 'POST or GET user failed'
        }

        amplitude.logEvent('Onboarding - Log In', { is_successful: false, phone_number: phoneNumber, error: error.description });
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

      amplitude.logEvent('Onboarding - Log In', { is_successful: false, phone_number: phoneNumber, error: error.description });
      throw error;
    });
}

export const refreshAuthToken = (firebaseUserObj) => (dispatch) => {
  return firebaseUserObj.getIdToken(true)
    .then((authToken) => {
      dispatch(receiveAuthToken(authToken));

      return new Promise.resolve(authToken);
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'Firebase getIdToken failed'
      }

      throw error;
    });
}
