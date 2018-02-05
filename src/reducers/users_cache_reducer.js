// Library Imports
import _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES }   from '../actions/post_actions.js';
import { FOLLOW_ACTION_TYPES } from '../actions/follow_actions.js';

//--------------------------------------------------------------------//

/* Data is in the form {
 *   userId1: {
 *      "id":                         30,
 *      "username":                   "anshu",
 *      "avatar_url":                 "1/posts/054b24a0-fcaa-11e7-aad3-a1f5d5b8af51.jpeg",
 *      "is_user_followed_by_client": false,
 *  },
 *   userId2: {...
 */

const DEFAULT_STATE = {};

const UsersCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

  //--------------------------------------------------------------------//
  // Receive and Refresh Post Actions
  //--------------------------------------------------------------------//

    // When receiving or refreshing posts, update the store with new post information
    case POST_ACTION_TYPES.RECEIVE_POSTS:
    case POST_ACTION_TYPES.REFRESH_POSTS:
      _.forEach(action.data.posts, (post) => {
        newState[post.author_id] = post.author;
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
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default UsersCacheReducer;
