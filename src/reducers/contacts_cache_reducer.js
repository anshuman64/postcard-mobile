// Library Imports
import _ from 'lodash';

// Local Imports
import { CONTACT_ACTION_TYPES } from '../actions/contact_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  phone_number: {
    "phone_number": +14082551245,
    "given_name":   'Leslie',
    "family_name":  'Knope',
    "thumbnail":    "content://com.android.contacts/display_photo/3",
    "type":         "cell",
  },
  phone_number: {...
*/
const DEFAULT_STATE = {};

const ContactsCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case CONTACT_ACTION_TYPES.RECEIVE_CONTACTS:
      newState = action.data.contacts;

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default ContactsCacheReducer;
