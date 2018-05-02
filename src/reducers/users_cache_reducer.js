// Library Imports
import _ from 'lodash';

// Local Imports
import { CLIENT_ACTION_TYPES }                   from '../actions/client_actions';
import { FRIEND_TYPES, FRIENDSHIP_ACTION_TYPES } from '../actions/friendship_actions';
import { POST_ACTION_TYPES }                     from '../actions/post_actions';
import { MESSAGE_ACTION_TYPES }                  from '../actions/message_actions';
import { GROUP_ACTION_TYPES }                    from '../actions/group_actions';
import { CONTACT_ACTION_TYPES }                  from '../actions/contact_actions';
import { BLOCK_ACTION_TYPES }                    from '../actions/block_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  userId1: {
    id:                            30,
    firebase_uid:                  jhlakjsdhfalkjyewou,
    username:                      anshu,
    phone_number:                  '+14082551245',
    email:                         null,
    avatar_medium_id:              29,
    is_banned:                     false,
    created_at:                    Date(),
    updated_at:                    Date(),
    is_user_blocked_by_client:     false,
    peek_message:                  {messageObj}
    friendship_status_with_client: accepted,

  },
  userId2: {...
*/

const DEFAULT_STATE = {};

const UsersCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

  //--------------------------------------------------------------------//
  // Client Actions
  //--------------------------------------------------------------------//

    case CLIENT_ACTION_TYPES.RECEIVE_CLIENT:
      newState[action.data.client.id] = action.data.client;

      return newState;

  //--------------------------------------------------------------------//
  // Friendship Actions
  //--------------------------------------------------------------------//

    case FRIENDSHIP_ACTION_TYPES.RECEIVE_FRIENDSHIPS:
      _.forEach(action.data.friends, (user) => {
        newState[user.id] = user;
        newState[user.id].friendship_status_with_client = action.data.friendType;
      })

      return newState;
    case FRIENDSHIP_ACTION_TYPES.SEND_FRIENDSHIP_REQUEST:
      requestee_id = action.data.friendship.requestee_id;

      newState[requestee_id]                               = newState[requestee_id] || {};
      newState[requestee_id].friendship_status_with_client = FRIEND_TYPES.SENT;

      return newState;
    case FRIENDSHIP_ACTION_TYPES.ACCEPT_FRIENDSHIP_REQUEST:
      requester_id = action.data.friendship.requester_id;

      newState[requester_id]                               = newState[requester_id] || {};
      newState[requester_id].friendship_status_with_client = FRIEND_TYPES.ACCEPTED;

      return newState;
    // Since we don't know if user is requester or requestee, delete friendships for both
    case FRIENDSHIP_ACTION_TYPES.REMOVE_FRIENDSHIP:
      requester_id = action.data.friendship.requester_id;
      requestee_id = action.data.friendship.requestee_id;

      newState[requester_id] = newState[requester_id] || {};
      newState[requestee_id] = newState[requestee_id] || {};

      newState[requester_id].friendship_status_with_client = null;
      newState[requestee_id].friendship_status_with_client = null;

      return newState;

  //--------------------------------------------------------------------//
  // Post Actions
  //--------------------------------------------------------------------//

    // When receiving or refreshing posts, update the store with new post information
    case POST_ACTION_TYPES.RECEIVE_POSTS:
    case POST_ACTION_TYPES.REFRESH_POSTS:
      _.forEach(action.data.posts, (post) => {
        newState[post.author_id] = _.merge(post.author, newState[post.author_id]); // use merge to keep friendship_status_with_client
      });

      return newState;

  //--------------------------------------------------------------------//
  // Block Actions
  //--------------------------------------------------------------------//

    case BLOCK_ACTION_TYPES.RECEIVE_BLOCKED_USERS:
      _.forEach(action.data.blockedUsers, (user) => {
        newState[user.id] = user;
      })

      return newState;
    case BLOCK_ACTION_TYPES.RECEIVE_BLOCK:
      newState[action.data.block.blockee_id].is_user_blocked_by_client = true;

      return newState;
    case BLOCK_ACTION_TYPES.REMOVE_BLOCK:
      newState[action.data.block.blockee_id].is_user_blocked_by_client = false;

      return newState;

  //--------------------------------------------------------------------//
  // Friendship Actions
  //--------------------------------------------------------------------//

    case FRIENDSHIP_ACTION_TYPES.PUSHER_CREATE_FRIENDSHIP:
      userId = action.data.user.id;

      newState[userId] = action.data.user;
      newState[userId].friendship_status_with_client = FRIEND_TYPES.SENT;

      return newState;
    case FRIENDSHIP_ACTION_TYPES.PUSHER_RECEIVE_FRIENDSHIP:
      userId = action.data.user.id;

      newState[userId] = action.data.user;
      newState[userId].friendship_status_with_client = FRIEND_TYPES.RECEIVED;

      return newState;
    case FRIENDSHIP_ACTION_TYPES.PUSHER_RECEIVE_ACCEPTED_FRIENDSHIP:
      userId = action.data.user.id;

      newState[userId] = action.data.user;
      newState[userId].friendship_status_with_client = FRIEND_TYPES.ACCEPTED;

      return newState;

  //--------------------------------------------------------------------//
  // Message Actions
  //--------------------------------------------------------------------//

    case MESSAGE_ACTION_TYPES.RECEIVE_CONVERSATIONS:
      _.forEach(action.data.groups, (group) => {
        _.forEach(group.users, (user) => {
          newState[user.id] = _.merge(user, newState[user.id]); // use merge to keep friendship_status_with_client
        });
      });

      return newState;
    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
      convoId = action.data.convoId;

      if (convoId > 0) {
        newState[convoId].peek_message = action.data.message;
      }

      return newState;
    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGES:
      convoId = action.data.convoId;
      messages = action.data.messages;

      if (action.data.isNew && messages.length != 0 && convoId > 0) {
        newState[convoId].peek_message = messages[0];
      }

      return newState;

  //--------------------------------------------------------------------//
  // Group Actions
  //--------------------------------------------------------------------//

    case GROUP_ACTION_TYPES.RECEIVE_GROUP:
      _.forEach(action.data.group.users, (user) => {
        newState[user.id] = _.merge(user, newState[user.id]); // use merge to keep friendship_status_with_client
      });

      return newState;

  //--------------------------------------------------------------------//
  // Contact Actions
  //--------------------------------------------------------------------//
    case CONTACT_ACTION_TYPES.RECEIVE_CONTACTS_WITH_ACCOUNTS:
      _.forEach(action.data.contacts, (user) => {
        newState[user.id] = user;
      });

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default UsersCacheReducer;
