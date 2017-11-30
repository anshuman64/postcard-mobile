// Local Imports
import * as UserAPI             from '../api/user_api.js';
import { toConfirmCodeScreen, toPostsScreen }  from './navigation_actions.js';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const RECEIVE_CONFIRMATION_CODE = 'RECEIVE_CONFIRMATION_CODE';
export const RECEIVE_USER = 'RECEIVE_USER';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveConfirmationCode = (data) => {
  return { type: RECEIVE_CONFIRMATION_CODE, data: data };
};

export const receiveUser = (data) => {
  return { type: RECEIVE_USER, data: data };
};


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const debugGetConfirmationCode = (phoneNumber) => (dispatch) => {
    dispatch(receiveConfirmationCode({phoneNumber: phoneNumber, confirmationCodeObj: '123456'}));
    dispatch(toConfirmCodeScreen());
};

export const getConfirmationCode = (phoneNumber) => (dispatch) => {
  return UserAPI.getConfirmationCode(phoneNumber)
    .then((confirmationCodeObj) => {
      dispatch(receiveConfirmationCode({phoneNumber: phoneNumber, confirmationCodeObj: confirmationCodeObj}));
      dispatch(toConfirmCodeScreen());
    });
};

export const confirmCode = (confirmationCodeObj, inputtedCode) => (dispatch) => {
  return confirmationCodeObj.confirm(inputtedCode)
    .then((firebaseUserObj) => {
      dispatch(receiveUser({firebaseUserObj: firebaseUserObj}));
      dispatch(toPostsScreen());
    });
};
