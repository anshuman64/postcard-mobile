// Library Imports
import * as _ from 'lodash';

// Local Imports
import { RECEIVE_CONFIRMATION_CODE, RECEIVE_USER } from '../actions/user_actions.js';


//--------------------------------------------------------------------//


const DEFAULT_STATE = {
  phoneNumber: '',
  confirmationCodeObj:  null,
  firebaseUserObj: null
};

const UserReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case RECEIVE_CONFIRMATION_CODE:
      newState.phoneNumber = action.data.phoneNumber;
      newState.confirmationCodeObj = action.data.confirmationCodeObj;

      return newState;
    case RECEIVE_USER:
      newState.firebaseUserObj = action.data.firebaseUserObj;

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//


export default UserReducer;
