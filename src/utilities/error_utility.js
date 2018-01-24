// Library Imports
import { Alert } from 'react-native';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


// Pops appropriate alert depending on error
export const defaultErrorAlert = (error) => {
  if (error.description === 'No internet connection') {
    Alert.alert('', 'No internet connection.', [{ text: 'OK', style: 'cancel' }]);
  } else {
    Alert.alert('', 'Something went wrong. Please try again later.', [{ text: 'OK', style: 'cancel' }]);
  }

  // console.error(error); // Debug Test
};

// Checks if error has a description. If not, add the description listed and return the error
export const setErrorDescription = (error, description) => {
  if (!error.description) {
    error.description = description;
  }

  return error;
};
