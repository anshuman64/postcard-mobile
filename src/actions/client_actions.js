// Library Imports
import Firebase  from 'react-native-firebase';
import AWS       from 'aws-sdk/dist/aws-sdk-react-native';
import OneSignal from 'react-native-onesignal';

// Local Imports
import { amplitude }               from '../utilities/analytics_utility';
import * as APIUtility             from '../utilities/api_utility';
import { setS3Client, uploadFile } from '../utilities/file_utility';
import { setPusherClient }         from '../utilities/push_utility';
import { setErrorDescription }     from '../utilities/error_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const CLIENT_ACTION_TYPES = {
  RECEIVE_FIREBASE_USER_OBJ: 'RECEIVE_FIREBASE_USER_OBJ',
  RECEIVE_AUTH_TOKEN:        'RECEIVE_AUTH_TOKEN',
  RECEIVE_CLIENT:            'RECEIVE_CLIENT'
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// firebaseUserObj (object): firebaseUserObj returned from Firebase auth
export const receiveFirebaseUserObj = (data) => {
  return { type: CLIENT_ACTION_TYPES.RECEIVE_FIREBASE_USER_OBJ, data: data };
};

// authToken (object): authToken generated from Firebase auth
export const receiveAuthToken = (data) => {
  return { type: CLIENT_ACTION_TYPES.RECEIVE_AUTH_TOKEN, data: data }
};

// client (user object): user object of client
export const receiveClient = (data) => {
  return { type: CLIENT_ACTION_TYPES.RECEIVE_CLIENT, data: data }
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
  return Firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
    .catch((error) => {
      if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        Firebase.auth().createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            throw setErrorDescription(error, 'Firebase email sign-in failed');
          });
      }

      throw setErrorDescription(error, 'Firebase email sign-in failed');
    });
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
      error = setErrorDescription(error, 'Firebase phone sign-in failed');
      amplitude.logEvent('Onboarding - Sign In With Phone Number', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Verifies confirmationCode using confirmationCodeObj and logs in user from ConfirmCodeScreen
export const verifyConfirmationCode = (confirmationCodeObj, inputtedCode) => (dispatch) => {
  return confirmationCodeObj.confirm(inputtedCode)
    .then((firebaseUserObj) => {
      amplitude.logEvent('Onboarding - Verify Confirmation Code', { is_successful: true });
    })
    .catch((error) => {
      error = setErrorDescription(error, 'Firebase code verification failed');
      amplitude.logEvent('Onboarding - Verify Confirmation Code', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};


// Generates authToken from Firebase using firebaseUserObj. Logs in user from database. Creates new user if firebase_uid has never been seen before.
export const loginClient = (firebaseUserObj) => (dispatch) => {
  let phoneNumber = firebaseUserObj._user.phoneNumber;
  let email       = firebaseUserObj._user.email;

  let setClient = (client, authToken, isNew) => {
    amplitude.setUserId(client.id);
    amplitude.setUserProperties({ username: client.username, database_id: client.id, phone_number: client.phone_number, email: client.email, firebase_uid: client.firebase_uid, created_at: client.created_at });
    amplitude.logEvent('Onboarding - Log In', { is_successful: true, is_new_user: isNew });

    OneSignal.sendTag('user_id', String(client.id));
    dispatch(setPusherClient(authToken, client.id));
    dispatch(receiveClient({ client: client }));
  }

  let handleExistingUser = (authToken) => {
    return APIUtility.get(authToken, '/users')
      .then((client) => {
        setClient(client, authToken, false);
      })
      .catch((error) => {
        if (error.message === 'Requester not found') {
          return handleNewUser(authToken);
        }

        error = setErrorDescription(error, 'GET user failed');
        amplitude.logEvent('Onboarding - Log In', { is_successful: false, phone_number: phoneNumber, email: email, error_description: error.description, error_message: error.message });
        throw error;
      });
  };

  let handleNewUser = (authToken) => {
    return APIUtility.post(authToken, '/users', { phone_number: phoneNumber, email: email })
      .then((newUser) => {
        setClient(newUser, authToken, true);
      })
      .catch((error) => {
        error = setErrorDescription(error, 'POST user failed');
        amplitude.logEvent('Onboarding - Log In', { is_successful: false, phone_number: phoneNumber, email: email, error_description: error.description, error_message: error.message });
        throw error;
      });
  };

  dispatch(receiveFirebaseUserObj({ firebaseUserObj: firebaseUserObj }));
  return dispatch(refreshAuthToken(firebaseUserObj))
    .then((newAuthToken) => {
      return handleExistingUser(newAuthToken);
    })
    .catch((error) => {
      error = setErrorDescription(error, 'Firebase getIdToken failed');
      amplitude.logEvent('Onboarding - Log In', { is_successful: false, phone_number: phoneNumber, email: email, error_description: error.description, error_message: error.message });
      throw error;
    });
}

let isRefreshing = false;

// Refreshes Firebase authToken and AWS credentials (if expired)
export const refreshAuthToken = (firebaseUserObj, func, ...params) => (dispatch) => {
  if (isRefreshing) {
    return new Promise.reject(new Error('Token refresh in progress'));
  }

  isRefreshing = true;

  return firebaseUserObj.getIdToken(true)
    .then((newAuthToken) => {
      dispatch(receiveAuthToken({ authToken: newAuthToken }));

      return configureAWS(newAuthToken)
        .then(() => {
          isRefreshing = false; // NOTE: don't put this in a .finally, it breaks returning the authToken
          setS3Client();

          if (func) {
            return dispatch(func(newAuthToken, firebaseUserObj, ...params));
          } else {
            return newAuthToken;
          }
        })
        .catch((error) => {
          isRefreshing = false;
          throw setErrorDescription(error, 'Configure AWS failed');
        });
    })
    .catch((error) => {
      isRefreshing = false;
      throw setErrorDescription(error, 'Firebase getIdToken failed');
    });
}

// PUT request to API to edit client username from UsernameScreen
export const editUsername = (authToken, firebaseUserObj, username) => (dispatch) => {
  return APIUtility.put(authToken, '/users', { username: username })
  .then((editedUser) => {
    amplitude.logEvent('Onboarding - Edit Username', { is_successful: true, username: username });
    dispatch(receiveClient({ client: editedUser }));
  })
  .catch((error) => {
    if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
      return dispatch(refreshAuthToken(firebaseUserObj, editUsername, username));
    }

    if (!error.description) {
      if (error.message === 'Username has already been taken') {
        error = setErrorDescription(error, 'Username taken');
      } else {
        error = setErrorDescription(error, 'PUT user for username failed');
      }
    }

    amplitude.logEvent('Onboarding - Edit Username', { is_successful: false, username: username, error_description: error.description, error_message: error.message });
    throw error;
  });
}

// PUT request to API to edit user avatar_medium_id from AvatarScreen
export const editAvatar = (authToken, firebaseUserObj, userId, medium) => (dispatch) => {
  let putUser = (updatedMedium) => {
    return APIUtility.put(authToken, '/users/avatar', { medium: updatedMedium })
      .then((editedUser) => {
        amplitude.logEvent('Onboarding - Edit Avatar', { is_successful: true });
        dispatch(receiveClient({ client: editedUser }));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshAuthToken(firebaseUserObj, editAvatar, userId, medium));
        }

        putUserError(error);
      });
  }

  let putUserError = (error) => {
    error = setErrorDescription(error, 'PUT user for avatar failed');
    amplitude.logEvent('Onboarding - Edit Avatar', { is_successful: false, error_description: error.description, error_message: error.message });
    throw error;
  }

  if (medium) {
    return dispatch(uploadFile(authToken, firebaseUserObj, userId, 'profile_pictures/', medium))
      .then((updatedMedium) => {
        return putUser(updatedMedium);
      })
      .catch((error) => {
        putUserError(error);
      });
  } else {
    return putUser(null);
  }
}
