// Library Imports
import _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES }   from '../actions/post_actions.js';
import { LIKE_ACTION_TYPES }   from '../actions/like_actions.js';
import { FOLLOW_ACTION_TYPES } from '../actions/follow_actions.js';

//--------------------------------------------------------------------//

/* Data is in the form {
 *   postId1: {
 *      "id": 30,
 *      "body": null,
 *      "author_id": 1,
 *      "image_url": "1/posts/054b24a0-fcaa-11e7-aad3-a1f5d5b8af51.jpeg",
 *      "created_at": "2018-01-18T23:48:06.000Z",
 *      "updated_at": "2018-01-18T23:48:06.000Z",
 *      "num_likes": 0,
 *      "is_liked_by_user": false,
 *      "author_username": "huuu",
 *      "author_avatar_url": "1/profile_pictures/3862f2d0-f707-11e7-911d-a54d5d66a9ee.jpeg",
 *      "is_author_followed_by_user": false
 *  },
 *   postId2: {...
 */

const DEFAULT_STATE = {};

const PostsCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    // When receiving or refreshing posts, update the store with new post information
    case POST_ACTION_TYPES.RECEIVE_POSTS:
    case POST_ACTION_TYPES.REFRESH_POSTS:
      _.forEach(action.data.posts, (post) => {
        newState[post.id] = post;
      });

      return newState;
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
    // When liking a post, increment the likes by 1 and set is_liked_by_user to true
    case LIKE_ACTION_TYPES.RECEIVE_LIKE:
      postToUpdate = newState[action.data.like.post_id];

      postToUpdate.num_likes++;
      postToUpdate.is_liked_by_user = true;

      return newState;
    // When unliking a post, decrement the likes by 1 and set is_liked_by_user to false
    case LIKE_ACTION_TYPES.REMOVE_LIKE:
      postToUpdate = newState[action.data.like.post_id];

      postToUpdate.num_likes--;
      postToUpdate.is_liked_by_user = false;

      return newState;
    // When following a new user, set is_author_followed_by_user to true for all posts with that author
    case FOLLOW_ACTION_TYPES.RECEIVE_FOLLOW:
      _.forEach(newState, (post) => {
        if (post.author_id === action.data.follow.followee_id) {
          post.is_author_followed_by_user = true;
        }
      });

      return newState;
    // When unfollowing a user, set is_author_followed_by_user to false for all posts with that author
    case FOLLOW_ACTION_TYPES.REMOVE_FOLLOW:
      _.forEach(newState, (post) => {
        if (post.author_id === action.data.follow.followee_id) {
          post.is_author_followed_by_user = false;
        }
      });

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsCacheReducer;
