// Library Imports
import _ from 'lodash';

// Local Imports
import { USER_ACTION_TYPES } from '../actions/user_actions.js';

//--------------------------------------------------------------------//


const DEFAULT_STATE = {
  firebaseUserObj:     null,
  authToken:           '',
  user:                null
};

const UserReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case USER_ACTION_TYPES.RECEIVE_FIREBASE_USER_OBJ:
      newState.firebaseUserObj = action.data;

      return newState;
    case USER_ACTION_TYPES.RECEIVE_AUTH_TOKEN:
      newState.authToken = action.data;
      // console.log(action.data); // Debug Test

      return newState;
    case USER_ACTION_TYPES.RECEIVE_USER:
      newState.user = action.data;

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default UserReducer;
