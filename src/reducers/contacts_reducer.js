// Library Imports
import _ from 'lodash';

// Local Imports
import { CONTACT_ACTION_TYPES } from '../actions/contact_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  phoneNumbersWithAccounts:    [],
  phoneNumbersWithoutAccounts: []
};

const ContactsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case CONTACT_ACTION_TYPES.RECEIVE_OTHER_CONTACTS:
      newState.phoneNumbersWithAccounts    = action.data.phoneNumbersWithAccounts;
      newState.phoneNumbersWithoutAccounts = action.data.phoneNumbersWithoutAccounts;

      return newState;
    case CONTACT_ACTION_TYPES.RECEIVE_INVITED_CONTACT:
      _.forEach(newState, (type) => {
        _.remove(type, (phoneNumber) => {
          return phoneNumber === action.data.phoneNumber;
        });
      });

      newState.phoneNumbersWithAccounts.unshift(action.data.phoneNumber);

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default ContactsReducer;
