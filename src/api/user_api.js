// Library Imports
import firebase from 'react-native-firebase';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


export const signInWithPhoneNumber = (payload) => {
  return firebase.auth().signInWithPhoneNumber(payload);
};
