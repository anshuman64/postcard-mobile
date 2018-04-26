// Library Imports
import _ from 'lodash';

// Local Imports
import { CONTACT_ACTION_TYPES } from '../actions/contact_actions';
import { POST_ACTION_TYPES }    from '../actions/post_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  phoneNumbersWithAccounts:    [],
  phoneNumbersWithoutAccounts: []
};

const ContactsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case CONTACT_ACTION_TYPES.RECEIVE_CONTACTS_WITH_ACCOUNTS:
      newState.phoneNumbersWithAccounts = action.data.contacts.map((x) => x.phone_number);

      return newState;
    case CONTACT_ACTION_TYPES.RECEIVE_OTHER_CONTACTS:
      newState.phoneNumbersWithoutAccounts = action.data.otherPhoneNumbers;

      return newState;
    case CONTACT_ACTION_TYPES.RECEIVE_INVITED_CONTACT:
      _.forEach(newState, (type) => {
        _.remove(type, (phoneNumber) => {
          return phoneNumber === action.data.phoneNumber;
        });
      });

      newState.phoneNumbersWithAccounts.unshift(action.data.phoneNumber);

      return newState;

    //--------------------------------------------------------------------//
    // Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POST:
      _.forEach(action.data.phoneNumbers, (contactPhoneNumber) => {
        _.forEach(newState, (type) => {
          _.remove(type, (phoneNumber) => {
            return phoneNumber === contactPhoneNumber;
          });
        });

        newState.phoneNumbersWithAccounts.unshift(contactPhoneNumber);
      });

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default ContactsReducer;
