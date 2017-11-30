// Library Imports
import firebase from 'react-native-firebase';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


export const getConfirmationCode = (payload) => {
  return firebase.auth().signInWithPhoneNumber(payload);
};
