// Library Imports
import _ from 'lodash';

// Local Imports
import { CONTACT_ACTION_TYPES } from '../actions/contact_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  phone_number1: {
    phone_number: +14082551245,
    given_name:   'Leslie',
    family_name:  'Knope',
    type:         'cell',
    is_invited:   false
  },
  phone_number2: {...
*/
const DEFAULT_STATE = {};

const ContactsCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case CONTACT_ACTION_TYPES.RECEIVE_CONTACTS:
      newState = action.data.contacts;

      return newState;
    case CONTACT_ACTION_TYPES.RECEIVE_INVITED_CONTACT:
      newState[action.data.phoneNumber].is_invited = true;

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default ContactsCacheReducer;
