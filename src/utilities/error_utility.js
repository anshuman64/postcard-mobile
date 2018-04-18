// Library Imports
import { Alert } from 'react-native';

// Local Imports
import { amplitude } from './analytics_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

let isAlertVisible = false;

// Pops appropriate alert depending on error
export const defaultErrorAlert = (error) => {
  if (isAlertVisible) {
    return;
  }

  isAlertVisible = true;

  let alertString = '';

  if (error.description === 'No internet connection') {
    alertString = 'No internet connection.';
  } else {
    alertString = 'Something went wrong. Please try again later.';
  }

  amplitude.logEvent('Error - General', { error_description: error.description, error_message: error.message });
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
