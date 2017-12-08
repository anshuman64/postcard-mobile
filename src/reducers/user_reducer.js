// Library Imports
import * as _ from 'lodash';

// Local Imports
import { RECEIVE_PHONE_NUMBER, RECEIVE_CONFIRMATION_CODE, RECEIVE_FIREBASE_USER_OBJ, RECEIVE_AUTH_TOKEN, RECEIVE_USER } from '../actions/user_actions.js';


//--------------------------------------------------------------------//


const DEFAULT_STATE = {
  phoneNumber: '',
  confirmationCodeObj:  null,
  firebaseUserObj: null,
  authToken: '',
  user: null
};

const UserReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case RECEIVE_PHONE_NUMBER:
      newState.phoneNumber = action.data.phoneNumber;

      return newState;
    case RECEIVE_CONFIRMATION_CODE:
      newState.confirmationCodeObj = action.data.confirmationCodeObj;

      return newState;
    case RECEIVE_FIREBASE_USER_OBJ:
      newState.firebaseUserObj = action.data.firebaseUserObj;

      return newState;
    case RECEIVE_AUTH_TOKEN:
      newState.authToken = action.data.authToken;

      return newState;
    case RECEIVE_USER:
      newState.user = action.data.user;

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//


export default UserReducer;
