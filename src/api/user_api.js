// Library Imports
import firebase from 'react-native-firebase';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// Takes phone number and returns confirmationCodeObj via Firebase API
export const getConfirmationCode = (payload) => {
  return firebase.auth().signInWithPhoneNumber(payload);
};
