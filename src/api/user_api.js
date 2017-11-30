// Library Imports
import firebase from 'react-native-firebase';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


export const signInUserWithPhoneNumber = (payload) => {
  return firebase.auth().signInWithPhoneNumber(payload);
};
