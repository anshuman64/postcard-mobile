// Library Imports
import Firebase from 'react-native-firebase';
import AWS      from 'aws-sdk/dist/aws-sdk-react-native';

// Local Imports
import { amplitude }   from '../utilities/analytics_utility.js';
import * as APIUtility from '../utilities/api_utility.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const USER_ACTION_TYPES = {
  RECEIVE_FIREBASE_USER_OBJ:     'RECEIVE_FIREBASE_USER_OBJ',
  RECEIVE_AUTH_TOKEN:            'RECEIVE_AUTH_TOKEN',
  RECEIVE_USER:                  'RECEIVE_USER'
};


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


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
// Helper Functions
//--------------------------------------------------------------------//

const configureAWS = (authToken) => {
  AWS.config.region = 'us-east-1';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:6df1340e-29c5-49f6-9692-7d2933d2e815',
    Logins: {
      'securetoken.google.com/insiya-mobile': authToken
    }
  })
}

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

      return new Promise.resolve(confirmationCodeObj);
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

  dispatch(receiveFirebaseUserObj(firebaseUserObj));
  return firebaseUserObj.getIdToken(true)
    .then((authToken) => {
      configureAWS(authToken);
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

const refreshAuthToken = (firebaseUserObj, func, ...params) => (dispatch) => {
  debugger
  return firebaseUserObj.getIdToken(true)
    .then((newAuthToken) => {
      configureAWS(newAuthToken);
      dispatch(receiveAuthToken(newAuthToken));

      if (func) {
        return dispatch(func(newAuthToken, firebaseUserObj, ...params));
      }
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'Firebase getIdToken failed'
      }

      throw error;
    });
}

export const editUsername = (authToken, firebaseUserObj, username) => (dispatch) => {
  return APIUtility.put(authToken, '/users', { username: username })
  .then((editedUser) => {
    amplitude.logEvent('Onboarding - Edit Username', { is_successful: true, username: username });

    return dispatch(receiveUser(editedUser));
  })
  .catch((error) => {
    if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
      return dispatch(refreshAuthToken(firebaseUserObj, editUsername, username));
    }

    if (!error.description) {
      if (error.message === 'username taken') { //TODO: update with proper backend messages
        error.description = 'Username taken';
      } else if (error.message === 'username invalid') {
        error.description = 'Username invalid';
      } else {
        error.description = 'PUT user for username failed'
      }
    }

    amplitude.logEvent('Onboarding - Edit Username', { is_successful: false, username: username, error: error.description });
    throw error;
  });
}

export const editAvatar = (authToken, firebaseUserObj, avatarUrl) => (dispatch) => {
  return APIUtility.put(authToken, '/users', { avatar_url: avatarUrl })
  .then((editedUser) => {
    amplitude.logEvent('Onboarding - Edit Avatar', { is_successful: true, avatar_url: avatarUrl });

    return dispatch(receiveUser(editedUser));
  })
  .catch((error) => {
    if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
      return dispatch(refreshAuthToken(firebaseUserObj, editAvatar, avatarUrl));
    }

    if (!error.description) {
      error.description = 'PUT user for avatarUrl failed'
    }

    amplitude.logEvent('Onboarding - Edit Username', { is_successful: false, avatar_url: avatarUrl, error: error.description });
    throw error;
  });
}
