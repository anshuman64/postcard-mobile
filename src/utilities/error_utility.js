// Library Imports
import { Alert } from 'react-native';


//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//

// Pops alert with 'No internet connection'
let noInternetError = () => {
  Alert.alert(
    '',
    'No internet connection.',
    [
      {text: 'OK', onPress: () => null, style: 'cancel'},
    ],
  )
}

// Pops alert when error is unknown
let unknownError = () => {
  Alert.alert(
    '',
    'Something went wrong. Please try again later.',
    [
      {text: 'OK', onPress: () => null, style: 'cancel'},
    ],
  )
}

//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// Pops appropriate alert depending on error
export function defaultErrorAlert(error) {
  if (error.description === 'No internet connection') {
    noInternetError();
  } else {
    unknownError();
  }

  console.log(error)
}

// Checks if error has a description. If not, add the description listed and return the error
export function setErrorDescription(error, description) {
  if (!error.description) {
    error.description = description;
  }

  return error;
}
