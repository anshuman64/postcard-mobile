// Library Imports
import _ from 'lodash';

// Local Imports
import { FRIEND_TYPES, FRIENDSHIP_ACTION_TYPES } from '../actions/friendship_actions';
import { MESSAGE_ACTION_TYPES }                  from '../actions/message_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  accepted: [],
  sent:     [],
  received: [],
  contacts: [],
};

const FriendshipsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Friendship Actions
    //--------------------------------------------------------------------//

    case FRIENDSHIP_ACTION_TYPES.RECEIVE_FRIENDSHIPS:
      newState[action.data.friendType] = [];

      _.forEach(action.data.friends, (user) => {
        newState[action.data.friendType].push(user.id);
      })

      return newState;
    case FRIENDSHIP_ACTION_TYPES.SEND_FRIENDSHIP_REQUEST:
      userId = action.data.friendship.requestee_id;

      _.remove(newState.contacts, (ids) => {
        return ids === userId;
      });

      newState.sent.unshift(userId);

      return newState;
    case FRIENDSHIP_ACTION_TYPES.ACCEPT_FRIENDSHIP_REQUEST:
      userId = action.data.friendship.requester_id;

      _.remove(newState.received, (ids) => {
        return ids === userId;
      });

      newState.accepted.unshift(userId);

      return newState;
    // Since we don't know if user is requester or requestee, delete ids for both
    case FRIENDSHIP_ACTION_TYPES.REMOVE_FRIENDSHIP:
      _.forEach(newState, (friendListType) => {
        _.remove(friendListType, (ids) => {
          return ids === action.data.friendship.requester_id;
        });

        _.remove(friendListType, (ids) => {
          return ids === action.data.friendship.requestee_id;
        });
      });

      return newState;

    //--------------------------------------------------------------------//
    // Pusher Friendship Actions
    //--------------------------------------------------------------------//

    case FRIENDSHIP_ACTION_TYPES.PUSHER_RECEIVE_FRIENDSHIP:
      userId = action.data.user.id;

      newState.received.unshift(userId);

      return newState;
    case FRIENDSHIP_ACTION_TYPES.PUSHER_RECEIVE_ACCEPTED_FRIENDSHIP:
      userId = action.data.user.id;

      _.remove(newState.sent, (ids) => {
        return ids === userId;
      });

      newState.accepted.unshift(userId);

      return newState;

  //--------------------------------------------------------------------//
  // Message Actions
  //--------------------------------------------------------------------//

    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
      convoId = action.data.convoId;

      _.remove(newState.accepted, (ids) => {
        return ids === convoId;
      });

      newState.accepted.unshift(convoId);

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default FriendshipsReducer;
