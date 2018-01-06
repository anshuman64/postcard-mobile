import { Alert } from 'react-native';

export const noInternetError = () => {
  Alert.alert(
    '',
    'No internet connection.',
    [
      {text: 'OK', onPress: () => null, style: 'cancel'},
    ],
  )
}

export const unknownError = () => {
  Alert.alert(
    '',
    'Something went wrong. Please try again later.',
    [
      {text: 'OK', onPress: () => null, style: 'cancel'},
    ],
  )
}

export function defaultErrorAlert(error) {
  if (error.description === 'No internet connection') {
    noInternetError();
  } else {
    unknownError();
  }

  console.log(error)
}
