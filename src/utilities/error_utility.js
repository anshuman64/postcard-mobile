// Library Imports
import { Alert } from 'react-native';


//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//

let noInternetError = () => {
  Alert.alert(
    '',
    'No internet connection.',
    [
      {text: 'OK', onPress: () => null, style: 'cancel'},
    ],
  )
}

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

export function defaultErrorAlert(error) {
  if (error.description === 'No internet connection') {
    noInternetError();
  } else {
    unknownError();
  }

  console.log(error)
}

export function setErrorDescription(error, description) {
  if (!error.description) {
    error.description = description;
  }

  return error;
}
