// Library Imports
import { Alert } from 'react-native';

// Local Imports
import { amplitude } from './analytics_utility';
import { refreshAuthToken } from '../actions/client_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

let isAlertVisible = false;

// Pops appropriate alert depending on error
export const defaultErrorAlert = (error) => {
  if (isAlertVisible || !error) {
    return;
  }

  isAlertVisible = true;

  let alertString = '';

  if (error.description === 'No internet connection') {
    alertString = 'No internet connection.';
  } else if (error.description === 'Circle name has already been taken') {
    alertString = 'Circle name has already been taken.';
  } else if (error.description === 'Minimum 2 recipients required') {
    alertString = 'Add at least two friends.';
  } else {
    alertString = 'Something went wrong. Please try again later.';
  }

  if (!error.description) {
    amplitude.logEvent('Error - Default Error Alert', { error_description: error.description, error_message: error.message });
  }
  // console.error(error); // Debug Test

  setTimeout(() => {
    Alert.alert('', alertString,
      [{ text: 'OK', onPress: () => isAlertVisible = false, style: 'cancel' }],
      { onDismiss: () => isAlertVisible = false }
    );
  }, 100);
};

// Checks if error has a description. If not, add the description listed and return the error
export const setErrorDescription = (error, description) => {
  if (!error.description) {
    error.description = description;
  }

  return error;
};

export const refreshTokenAndResume = (firebaseUserObj, func, ...params) => (dispatch) => {
  return dispatch(refreshAuthToken(firebaseUserObj))
    .then((newAuthToken) => {
      return dispatch(func(newAuthToken, firebaseUserObj, ...params));
    })
    .catch((error) => {
      if (error.message === 'Token refresh was in progress') {
        return dispatch(refreshTokenAndResume(firebaseUserObj, func, ...params));
      }
    });
}
