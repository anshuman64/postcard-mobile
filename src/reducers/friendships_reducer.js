// Library Imports
import _ from 'lodash';

// Local Imports
import { FRIEND_TYPES, FRIENDSHIP_ACTION_TYPES } from '../actions/friendship_actions';
import { POST_ACTION_TYPES }                     from '../actions/post_actions';
import { MESSAGE_ACTION_TYPES }                  from '../actions/message_actions';

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
      newState.sent.unshift(action.data.friendship.requestee_id);

      return newState;
    case FRIENDSHIP_ACTION_TYPES.ACCEPT_FRIENDSHIP_REQUEST:
      userId = action.data.friendship.requester_id;

      _.remove(newState.received, (ids) => {
        return ids === userId;
      });

      newState.accepted.unshift(userId);

      return newState;
    case FRIENDSHIP_ACTION_TYPES.REMOVE_FRIENDSHIP:
    case FRIENDSHIP_ACTION_TYPES.PUSHER_DESTROY_FRIENDSHIP:
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
      newState.received.unshift(action.data.user.id);

      return newState;
    case FRIENDSHIP_ACTION_TYPES.PUSHER_RECEIVE_ACCEPTED_FRIENDSHIP:
      userId = action.data.user.id;

      _.remove(newState.sent, (ids) => {
        return ids === userId;
      });

      newState.accepted.unshift(userId);

      return newState;

  //--------------------------------------------------------------------//
  // Post Actions
  //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POST:
      _.forEach(action.data.recipients, (userIds) => {
        _.remove(newState.accepted, (ids) => {
          return ids === userIds;
        });

        newState.accepted.unshift(userIds);
      });

      return newState;

  //--------------------------------------------------------------------//
  // Message Actions
  //--------------------------------------------------------------------//

    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
      userId = action.data.userId;

      _.remove(newState.accepted, (ids) => {
        return ids === userId;
      });

      newState.accepted.unshift(userId);

      return newState;
    case POST_ACTION_TYPES.PUSHER_RECEIVE_POST:
    case MESSAGE_ACTION_TYPES.PUSHER_RECEIVE_MESSAGE:
      userId = action.data.user.id;

      _.remove(newState.accepted, (ids) => {
        return ids === userId;
      });

      newState.accepted.unshift(userId);

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default FriendshipsReducer;
