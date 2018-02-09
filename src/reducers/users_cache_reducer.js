// Library Imports
import _ from 'lodash';

// Local Imports
import { CLIENT_ACTION_TYPES }                   from '../actions/client_actions.js';
import { FRIEND_TYPES, FRIENDSHIP_ACTION_TYPES } from '../actions/friendship_actions.js';
import { POST_ACTION_TYPES }                     from '../actions/post_actions.js';
import { FOLLOW_ACTION_TYPES }                   from '../actions/follow_actions.js';

//--------------------------------------------------------------------//

/* Data is in the form {
 *   userId1: {
 *      "id":                            30,
 *      "username":                      "anshu",
 *      "avatar_url":                    "1/posts/054b24a0-fcaa-11e7-aad3-a1f5d5b8af51.jpeg",
 *      "is_user_followed_by_client":    false,
 *      "friendship_status_with_client": "accepted",
 *  },
 *   userId2: {...
 */

const DEFAULT_STATE = {};

const UsersCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

  //--------------------------------------------------------------------//
  // Friendship Actions
  //--------------------------------------------------------------------//

    case CLIENT_ACTION_TYPES.RECEIVE_CLIENT:
      newState[action.data.user.id] = action.data.user;

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
    case FRIENDSHIP_ACTION_TYPES.ACCEPT_FRIENDSHIP_REQUEST:
      requester_id = action.data.friendship.requester_id;

      newState[requester_id]                               = newState[requester_id] || {};
      newState[requester_id].friendship_status_with_client = FRIEND_TYPES.ACCEPTED;

      return newState;
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
  // Follow Actions
  //--------------------------------------------------------------------//

    // When following a new user, set is_user_followed_by_client to true for all posts with that author
    case FOLLOW_ACTION_TYPES.RECEIVE_FOLLOW:
      _.forEach(newState, (user) => {
        if (user.id === action.data.follow.followee_id) {
          user.is_user_followed_by_client = true;
        }
      });

      return newState;
    // When unfollowing a user, set is_user_followed_by_client to false for all posts with that author
    case FOLLOW_ACTION_TYPES.REMOVE_FOLLOW:
      _.forEach(newState, (user) => {
        if (user.id === action.data.follow.followee_id) {
          user.is_user_followed_by_client = false;
        }
      });

      return newState;

  //--------------------------------------------------------------------//
  // Friendship Actions
  //--------------------------------------------------------------------//

  case FRIENDSHIP_ACTION_TYPES.PUSHER_CREATE_FRIENDSHIP:
    requestee_id = action.data.user.id;

    newState[requestee_id] = action.data.user;
    newState[requestee_id].friendship_status_with_client = FRIEND_TYPES.SENT;

    return newState;
  case FRIENDSHIP_ACTION_TYPES.PUSHER_RECEIVE_FRIENDSHIP:
    requester_id = action.data.user.id;

    newState[requester_id] = action.data.user;
    newState[requester_id].friendship_status_with_client = FRIEND_TYPES.RECEIVED;

    return newState;
  case FRIENDSHIP_ACTION_TYPES.PUSHER_RECEIVE_ACCEPTED_FRIENDSHIP:
    userId = action.data.user.id;

    newState[userId] = action.data.user;
    newState[userId].friendship_status_with_client = FRIEND_TYPES.ACCEPTED;

    return newState;

    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default UsersCacheReducer;
