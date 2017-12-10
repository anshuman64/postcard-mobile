// Library Imports
import firebase from 'react-native-firebase';

// Local Imports
import * as APIUtility from '../utilities/api_utility';


//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// Takes phone number and returns confirmationCodeObj via Firebase API
export const getConfirmationCode = (payload) => {
  return firebase.auth().signInWithPhoneNumber(payload);
};

export const createUser = (payload, authToken) => {
  return APIUtility.post('/users', payload, authToken);
}

export const getUserOnAuthStateChange = (payload) => {
  return firebase.auth().onAuthStateChanged(payload);
}
