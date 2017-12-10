// Library Imports
import Firebase from 'react-native-firebase';

// Local Imports
import * as APIUtility from '../utilities/api_utility';


//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// TODO: Change order of arguments
// Takes phone number and returns confirmationCodeObj via Firebase API
export const getConfirmationCode = (payload) => {
  return Firebase.auth().signInWithPhoneNumber(payload);
};

export const createUser = (payload, authToken) => {
  return APIUtility.post('/users', payload, authToken);
}

export const getUserOnAuthStateChange = (payload) => {
  return Firebase.auth().onAuthStateChanged(payload);
}
