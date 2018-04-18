// Library Imports
import _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES }    from '../actions/post_actions';
import { MESSAGE_ACTION_TYPES } from '../actions/message_actions';
import { LIKE_ACTION_TYPES }    from '../actions/like_actions';
import { FLAG_ACTION_TYPES }    from '../actions/flag_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  postId1: {
    "id":                   30,
    "body":                 "hello world!",
    "author_id":            1,
    "image_url":            "1/posts/054b24a0-fcaa-11e7-aad3-a1f5d5b8af51.jpeg",
    "created_at":           "2018-01-18T23:48:06.000Z",
    "updated_at":           "2018-01-18T23:48:06.000Z",
    "num_likes":            0,
    "is_liked_by_client":   false,
    "is_flagged_by_client": false,
  },
  postId2: {...
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
    case POST_ACTION_TYPES.RECEIVE_POSTS_FROM_MESSAGES:
      _.forEach(action.data.posts, (post) => {
        newState[post.id] = _.omit(post, 'author');
      });

      return newState;

  //--------------------------------------------------------------------//
  // Create Post Actions
  //--------------------------------------------------------------------//

    // When creating a new post, update the store with the new post
    case POST_ACTION_TYPES.RECEIVE_POST:
      newState[action.data.post.id] = action.data.post;

      return newState;

  //--------------------------------------------------------------------//
  // Like Post Actions
  //--------------------------------------------------------------------//

    // When liking a post, increment the likes by 1 and set is_liked_by_client to true
    case LIKE_ACTION_TYPES.RECEIVE_LIKE:
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

  //--------------------------------------------------------------------//
  // Pusher Actions
  //--------------------------------------------------------------------//

  case POST_ACTION_TYPES.PUSHER_RECEIVE_POST:
    postId = action.data.post.id;

    newState[postId] = action.data.post;

    // Initialize jbuilder data, knowing that new posts will have these default values
    newState[postId].num_likes            = 0;
    newState[postId].is_liked_by_client   = false;
    newState[postId].num_flags            = 0;
    newState[postId].is_flagged_by_client = false;

    return newState;

    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsCacheReducer;
