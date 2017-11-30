// Local Imports
import * as UserAPI             from '../api/user_api.js';
import { toConfirmCodeScreen }  from './navigation_actions.js';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const SIGN_IN = 'SIGN_IN';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const signIn = (data) => {
  return { type: SIGN_IN, data: data };
};


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//


export const signInWithPhoneNumber = (phoneNumber) => (dispatch) => {
  return UserAPI.signInWithPhoneNumber(phoneNumber)
    .then((confirmationCodeObj) => {
      dispatch(signIn({phoneNumber, confirmationCodeObj}));
      dispatch(toConfirmCodeScreen());
    })
    .catch((error) => console.error(error))
};
