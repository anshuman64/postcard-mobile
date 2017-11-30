// Library Imports
import firebase from 'react-native-firebase';

// Local Imports
import * as UserAPI from '../api/user_api.js';


//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const SIGN_IN_WITH_PHONE_NUMBER = 'SIGN_IN_WITH_PHONE_NUMBER';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const signInWithPhoneNumber = (data) => {
  return { type: SIGN_IN_WITH_PHONE_NUMBER, data: data };
};


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//


export const signInUserWithPhoneNumber = (phoneNumber) => (dispatch) => {
  return UserAPI.signInUserWithPhoneNumber(phoneNumber).then((confirmationCodeObj) => {
    dispatch(signInWithPhoneNumber(phoneNumber, confirmationCodeObj));
  });
};
