// Library Imports
import * as _ from 'lodash';

// Local Imports
import { SIGN_IN } from '../actions/user_actions.js';


//--------------------------------------------------------------------//


const DEFAULT_STATE = {
  phoneNumber: '',
  confirmationCodeObj:  null
};

const UserReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case SIGN_IN:
      newState = {
        phoneNumber: action.data.phoneNumber,
        confirmationCodeObj: action.data.confirmationCodeObj
      }
      
      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//


export default UserReducer;
