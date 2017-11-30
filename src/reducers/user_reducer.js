// Library Imports
import * as _ from 'lodash';

// Local Imports
import { SIGN_IN_WITH_PHONE_NUMBER } from '../actions/user_actions.js';


//--------------------------------------------------------------------//


const DEFAULT_STATE = {
  phoneNumber: '',
  confirmationCodeObj:  null
};

const UserReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case SIGN_IN_WITH_PHONE_NUMBER:
      newState = {
        phoneNumber: action.phoneNumber,
        confirmationCodeObj: action.confirmationCodeObj
      }

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//


export default UserReducer;
