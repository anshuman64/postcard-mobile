// Library Imports
import _ from 'lodash';

// Local Imports
import { FRIENDSHIP_ACTION_TYPES }  from '../actions/friendship_actions.js';

//--------------------------------------------------------------------//


const DEFAULT_STATE = {
  accepted: [],
  sent:     [],
  received: [],
};


const FriendshipsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case FRIENDSHIP_ACTION_TYPES.RECEIVE_FRIENDSHIPS:
      _.forEach(action.data.friends, (user) => {
        newState[action.data.friendType].unshift(user.id);
      })

      return newState;
    case FRIENDSHIP_ACTION_TYPES.SEND_FRIENDSHIP_REQUEST:
      newState.sent.unshift(action.data.user.id);

      return newState;
    case FRIENDSHIP_ACTION_TYPES.ACCEPT_FRIENDSHIP_REQUEST:
      let userId = action.data.user.id;

      _.remove(newState.received, (users) => {
        return users.id === userId;
      });

      newState.accepted.unshift(userId);

      return newState;
    case FRIENDSHIP_ACTION_TYPES.REMOVE_FRIENDSHIP:
      _.remove(newState.accepted, (users) => {
        return users.id === action.data.user.id;
      });

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default FriendshipsReducer;
