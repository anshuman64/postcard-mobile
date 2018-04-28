// Library Imports
import _ from 'lodash';

// Local Imports
import { CONTACT_ACTION_TYPES } from '../actions/contact_actions';
import { POST_ACTION_TYPES }    from '../actions/post_actions';
import { GROUP_ACTION_TYPES }   from '../actions/group_actions';

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
    // Post & Group Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POST:
    case GROUP_ACTION_TYPES.RECEIVE_GROUP:
    case GROUP_ACTION_TYPES.EDIT_GROUP:
      _.forEach(action.data.contactPhoneNumbers, (contactPhoneNumber) => {
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
