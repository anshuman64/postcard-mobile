// Library Imports
import _ from 'lodash';

// Local Imports
import { CLIENT_ACTION_TYPES } from '../actions/client_actions.js';

//--------------------------------------------------------------------//


const DEFAULT_STATE = {
  firebaseUserObj:     null,
  authToken:           '',
  user:              null
};

const ClientReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case CLIENT_ACTION_TYPES.RECEIVE_FIREBASE_USER_OBJ:
      newState.firebaseUserObj = action.data.firebaseUserObj;

      return newState;
    case CLIENT_ACTION_TYPES.RECEIVE_AUTH_TOKEN:
      newState.authToken = action.data.authToken;
      // console.log(action.data); // Debug Test

      return newState;
    case CLIENT_ACTION_TYPES.RECEIVE_CLIENT:
      newState.user = action.data.user;

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default ClientReducer;
