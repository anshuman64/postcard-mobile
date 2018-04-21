// Library Imports
import _ from 'lodash';

// Local Imports
import { FRIEND_TYPES, FRIENDSHIP_ACTION_TYPES } from '../actions/friendship_actions';
import { GROUP_ACTION_TYPES }                    from '../actions/group_actions';
import { MESSAGE_ACTION_TYPES }                  from '../actions/message_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  conversations: [],
};

const ConversationsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    case MESSAGE_ACTION_TYPES.RECEIVE_CONVERSATIONS:
      conversations = [];

      _.forEach(action.data.friends, (friend) => {
        date = friend.peek_message ? new Date(friend.peek_message.created_at) : new Date(friend.created_at);
        conversations.push({ id: friend.id, date: date});
      });

      _.forEach(action.data.groups, (group) => {
        date = group.peek_message ? new Date(group.peek_message.created_at) : new Date(group.created_at);
        conversations.push({ id: -1 * group.id, date: date}); // WARNING/NOTE: using "-1 * " to denote groups id's
      });

      conversations.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });

      _.forEach(conversations, (conversation) => {
        newState.conversations.push(conversation.id);
      });

      return newState;

    //--------------------------------------------------------------------//
    // Friendship Actions
    //--------------------------------------------------------------------//

    case FRIENDSHIP_ACTION_TYPES.ACCEPT_FRIENDSHIP_REQUEST:
      userId = action.data.friendship.requester_id;

      newState.conversations.unshift(userId);

      return newState;
    // Since we don't know if user is requester or requestee, delete ids for both
    case FRIENDSHIP_ACTION_TYPES.REMOVE_FRIENDSHIP:
      _.remove(newState.conversations, (ids) => {
        return ids === action.data.friendship.requester_id;
      });

      _.remove(newState.conversations, (ids) => {
        return ids === action.data.friendship.requestee_id;
      });

      return newState;

    //--------------------------------------------------------------------//
    // Pusher Friendship Actions
    //--------------------------------------------------------------------//

    case FRIENDSHIP_ACTION_TYPES.PUSHER_RECEIVE_ACCEPTED_FRIENDSHIP:
      userId = action.data.user.id;

      newState.conversations.unshift(userId);

      return newState;

    //--------------------------------------------------------------------//
    // Group Actions
    //--------------------------------------------------------------------//

    case GROUP_ACTION_TYPES.RECEIVE_GROUP:
      group = action.data.group;

      newState.conversations.unshift(-1 * group.id);

      return newState;
    case GROUP_ACTION_TYPES.REMOVE_GROUP:
      group = action.data.group;

      _.remove(newState.conversations, (ids) => {
        return ids === -1 * group.id;
      });

      return newState;

    //--------------------------------------------------------------------//
    // Message Actions
    //--------------------------------------------------------------------//

    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
      convoId = action.data.convoId;

      _.remove(newState.conversations, (ids) => {
        return ids === convoId;
      });

      newState.conversations.unshift(convoId);

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default ConversationsReducer;
