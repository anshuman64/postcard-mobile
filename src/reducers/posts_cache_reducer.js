// Library Imports
import _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES }   from '../actions/post_actions.js';
import { LIKE_ACTION_TYPES }   from '../actions/like_actions.js';
import { FLAG_ACTION_TYPES }   from '../actions/flag_actions.js';
import { FOLLOW_ACTION_TYPES } from '../actions/follow_actions.js';

//--------------------------------------------------------------------//

/* Data is in the form {
 *   postId1: {
 *      "id":                   30,
 *      "body":                 "hello world!",
 *      "author_id":            1,
 *      "image_url":            "1/posts/054b24a0-fcaa-11e7-aad3-a1f5d5b8af51.jpeg",
 *      "created_at":           "2018-01-18T23:48:06.000Z",
 *      "updated_at":           "2018-01-18T23:48:06.000Z",
 *      "num_likes":            0,
 *      "is_liked_by_client":   false,
 *      "is_flagged_by_client": false,
 *  },
 *   postId2: {...
 */

const DEFAULT_STATE = {};

const PostsCacheReducer = (state = DEFAULT_STATE, action) => {
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
        newState[post.id] = _.omit(post, 'author');
      });

      return newState;

  //--------------------------------------------------------------------//
  // Create and Delete Post Actions
  //--------------------------------------------------------------------//

    // When creating a new post, update the store with the new post
    case POST_ACTION_TYPES.RECEIVE_POST:
      newState[action.data.post.id] = action.data.post;

      return newState;
    // When deleting a post, remove the post from the store
    case POST_ACTION_TYPES.REMOVE_POST:
      _.remove(newState, (postId) => {
        return postId === action.data.post.id;
      });

      return newState;

  //--------------------------------------------------------------------//
  // Like Post Actions
  //--------------------------------------------------------------------//

    // When liking a post, increment the likes by 1 and set is_liked_by_client to true
    case LIKE_ACTION_TYPES.RECEIVE_CLIENT_LIKE:
      postToUpdate = newState[action.data.like.post_id];

      postToUpdate.num_likes++;
      postToUpdate.is_liked_by_client = true;

      return newState;
    // When unliking a post, decrement the likes by 1 and set is_liked_by_client to false
    case LIKE_ACTION_TYPES.REMOVE_LIKE:
      postToUpdate = newState[action.data.like.post_id];

      postToUpdate.num_likes--;
      postToUpdate.is_liked_by_client = false;

      return newState;
    // When another user likes client's post, increment the likes by 1
    case LIKE_ACTION_TYPES.RECEIVE_USER_LIKE:
      postToUpdate = newState[action.data.like.post_id];
      postToUpdate.num_likes++;

      return newState;

  //--------------------------------------------------------------------//
  // Flag Post Actions
  //--------------------------------------------------------------------//

    // When flagging a post, set is_flagged_by_client to true
    case FLAG_ACTION_TYPES.RECEIVE_FLAG:
      newState[action.data.flag.post_id].is_flagged_by_client = true;

      return newState;
    // When unflagging a post, set is_flagged_by_client to false
    case FLAG_ACTION_TYPES.REMOVE_FLAG:
      newState[action.data.flag.post_id].is_flagged_by_client = false;

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsCacheReducer;
