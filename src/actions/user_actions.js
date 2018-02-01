// Library Imports
import Firebase from 'react-native-firebase';
import AWS      from 'aws-sdk/dist/aws-sdk-react-native';

// Local Imports
import { getImage }            from './image_actions.js';
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';

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

// Uses Firebase authToken to refresh AWS credentials
let configureAWS = (authToken) => {
    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:6df1340e-29c5-49f6-9692-7d2933d2e815',
      Logins: {
        'securetoken.google.com/insiya-mobile': authToken
      }
    });

    return AWS.config.credentials.refreshPromise();
}

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// Logs in using email and password via Firebase auth from DebugLoginScreen
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
          throw setErrorDescription(error, 'Firebase email sign-in failed');
        });
      }
    )
}

// Uses Firebase to send confirmationCode to phoneNumber from LoginScreen
export const getConfirmationCode = (phoneNumber) => (dispatch) => {
  return Firebase.auth().signInWithPhoneNumber(phoneNumber)
    .then((confirmationCodeObj) => {
      amplitude.logEvent('Onboarding - Sign In With Phone Number', { is_successful: true });
      amplitude.setUserProperties({ phone_number: phoneNumber });

      return confirmationCodeObj;
    })
    .catch((error) => {
      amplitude.logEvent('Onboarding - Sign In With Phone Number', { is_successful: false, error_description: error.description, error_message: error.message });
      throw setErrorDescription(error, 'Firebase phone sign-in failed');
    });
};

// Verifies confirmationCode using confirmationCodeObj and logs in user from ConfirmCodeScreen
export const verifyConfirmationCode = (confirmationCodeObj, inputtedCode) => (dispatch) => {
  return confirmationCodeObj.confirm(inputtedCode)
    .then((firebaseUserObj) => {
      amplitude.logEvent('Onboarding - Verify Confirmation Code', { is_successful: true });
    })
    .catch((error) => {
      amplitude.logEvent('Onboarding - Verify Confirmation Code', { is_successful: false, error_description: error.description, error_message: error.message });
      throw setErrorDescription(error, 'Firebase code verification failed');
    });
};

// Generates authToken from Firebase using firebaseUserObj. Logs in user from database. Creates new user if firebase_uid has never been seen before.
export const loginUser = (firebaseUserObj) => (dispatch) => {
  let phoneNumber = firebaseUserObj._user.phoneNumber ? firebaseUserObj._user.phoneNumber : firebaseUserObj._user.email;

  let setUser = (user, isNew) => {
    amplitude.setUserId(user.id);
    amplitude.setUserProperties({ database_id: user.id, phone_number: user.phone_number, firebase_uid: user.firebase_uid, created_at: user.created_at });
    amplitude.logEvent('Onboarding - Log In', { is_successful: true, is_new_user: isNew });

    dispatch(receiveUser(user));

    if (user.avatar_url) {
      dispatch(getImage(user.avatar_url));
    }
  }

  let handleExistingUser = (authToken) => {
    return APIUtility.get(authToken, '/users')
      .then((user) => {
        setUser(user, false);
      })
      .catch((error) => {
        if (error.toString() === 'Error: User not found') {
          return handleNewUser(authToken);
        }

        amplitude.logEvent('Onboarding - Log In', { is_successful: false, phone_number: phoneNumber, error_description: error.description, error_message: error.message });
        throw setErrorDescription(error, 'GET user failed');
      });
  };

  let handleNewUser = (authToken) => {
    return APIUtility.post(authToken, '/users', { phone_number: phoneNumber })
      .then((newUser) => {
        setUser(newUser, true);
      })
      .catch((error) => {
        amplitude.logEvent('Onboarding - Log In', { is_successful: false, phone_number: phoneNumber, error_description: error.description, error_message: error.message });
        throw setErrorDescription(error, 'POST user failed');
      })
  };

  dispatch(receiveFirebaseUserObj(firebaseUserObj));
  return dispatch(refreshAuthToken(firebaseUserObj))
    .then((newAuthToken) => {
      return handleExistingUser(newAuthToken);
    })
    .catch((error) => {
      amplitude.logEvent('Onboarding - Log In', { is_successful: false, phone_number: phoneNumber, error_description: error.description, error_message: error.message });
      throw setErrorDescription(error, 'Firebase getIdToken failed');
    })
}

// Refreshes Firebase authToken and AWS credentials (if expired)
export const refreshAuthToken = (firebaseUserObj, func, ...params) => (dispatch) => {
  let configureAWSError = (error) => {
    throw setErrorDescription(error, 'Configure AWS failed');
  }

  let getIdTokenError = (error) => {
    throw setErrorDescription(error, 'Firebase getIdToken failed');
  }

  return firebaseUserObj.getIdToken(true)
    .then((newAuthToken) => {
      dispatch(receiveAuthToken(newAuthToken));

      return configureAWS(newAuthToken)
        .then(() => {
          if (func) {
            return dispatch(func(newAuthToken, firebaseUserObj, ...params));
          } else {
            return newAuthToken;
          }
        }, configureAWSError)
    }, getIdTokenError)
}

// PUT request to API to edit user username from UsernameScreen
export const editUsername = (authToken, firebaseUserObj, username) => (dispatch) => {
  return APIUtility.put(authToken, '/users', { username: username })
  .then((editedUser) => {
    amplitude.logEvent('Onboarding - Edit Username', { is_successful: true, username: username });

    dispatch(receiveUser(editedUser));
  })
  .catch((error) => {
    if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
      return dispatch(refreshAuthToken(firebaseUserObj, editUsername, username));
    }

    if (!error.description) {
      if (error.message === 'Username has already been taken') {
        error.description = 'Username taken';
      } else {
        error.description = 'PUT user for username failed'
      }
    }

    amplitude.logEvent('Onboarding - Edit Username', { is_successful: false, username: username, error_description: error.description, error_message: error.message });
    throw error;
  });
}

// PUT request to API to edit user avatar_url from AvatarScreen
export const editAvatar = (authToken, firebaseUserObj, avatarUrl) => (dispatch) => {
  return APIUtility.put(authToken, '/users', { avatar_url: avatarUrl })
  .then((editedUser) => {
    amplitude.logEvent('Onboarding - Edit Avatar', { is_successful: true, avatar_url: avatarUrl });

    dispatch(receiveUser(editedUser));

    if (editedUser.avatar_url) {
      dispatch(getImage(editedUser.avatar_url));
    }
  })
  .catch((error) => {
    if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
      return dispatch(refreshAuthToken(firebaseUserObj, editAvatar, avatarUrl));
    }

    amplitude.logEvent('Onboarding - Edit Username', { is_successful: false, avatar_url: avatarUrl, error_description: error.description, error_message: error.message });
    throw setErrorDescription(error, 'PUT user for avatarUrl failed');
  });
}
