// Library Imports
import _ from 'lodash';

// Local Imports
import { USER_ACTION_TYPES }             from '../actions/user_actions.js';
import { POST_ACTION_TYPES, POST_TYPES } from '../actions/post_actions.js';
import { LIKE_ACTION_TYPES }             from '../actions/like_actions.js';
import { mergeSorted }                   from '../utilities/function_utility.js';

//--------------------------------------------------------------------//

// Data is in the form {
//   0: {
//     allPosts:  { data: [], lastUpdated: null, isEnd: false },
//   }
//   userId1: {
//     authoredPosts: { data: [], lastUpdated: null, isEnd: false }
//     likedPosts:    { data: [], lastUpdated: null, isEnd: false }
//   }
//   userId2...
// }
const DEFAULT_STATE = {};

const PostsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Receive User Action
    //--------------------------------------------------------------------//

    case USER_ACTION_TYPES.RECEIVE_USER:
      userId = action.data.id;

      newState[userId] = newState[userId] || {};

      _.forEach(POST_TYPES, (postType) => {
        newState[userId][postType]             = newState[userId][postType]             || {};
        newState[userId][postType].data        = newState[userId][postType].data        || [];
        newState[userId][postType].lastUpdated = newState[userId][postType].lastUpdated || new Date();
        newState[userId][postType].isEnd       = newState[userId][postType].isEnd       || false;
      })

      return newState;

    //--------------------------------------------------------------------//
    // Get and Refresh Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POSTS:
      userId   = action.data.userId;
      postType = action.data.postType;

      if (action.data.posts.length === 0) {
        newState[userId][postType].isEnd = true;
      } else {
        _.forEach(action.data.posts, (post) => {
          newState[userId][postType].data.push(post.id);
        });
      }

      return newState;
    case POST_ACTION_TYPES.REFRESH_POSTS:
      userId   = action.data.userId;
      postType = action.data.postType;

      // Make sure objects exist
      newState[userId] = newState[userId] || {};
      _.forEach(POST_TYPES, (postType) => {
        newState[userId][postType]      = newState[userId][postType] || {};
        newState[userId][postType].data = newState[userId][postType].data || [];
      })

      newState[userId][postType].lastUpdated = new Date();

      if (action.data.posts.length < 10) { // 10 = number of posts fetched
        newState[userId][postType].isEnd = true;
      } else {
        newState[userId][postType].isEnd = false;
      }

      if (action.data.posts.length > 0) {
        newState[userId][postType].data = mergeSorted(newState[userId][postType].data, action.data.posts.map(post => post.id));
      }

      return newState;

    //--------------------------------------------------------------------//
    // Create and Remove Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POST:
      // assumes that this case is only hit when the current user creates a post
      newState[action.data.userId][POST_TYPES.ALL].data.unshift(action.data.post.id);
      newState[action.data.userId][POST_TYPES.AUTHORED].data.unshift(action.data.post.id);

      return newState;
    case POST_ACTION_TYPES.REMOVE_POST:
    // assumes that this case is only hit when the current user removes their own post
      _.remove(newState[action.data.userId][POST_TYPES.ALL].data, (postId) => {
        return postId === action.data.post.id;
      });

      _.remove(newState[action.data.userId][POST_TYPES.AUTHORED].data, (postId) => {
        return postId === action.data.post.id;
      });

      return newState;

    //--------------------------------------------------------------------//
    // Like Post Actions
    //--------------------------------------------------------------------//

    case LIKE_ACTION_TYPES.RECEIVE_LIKE:
      newState[action.data.userId][POST_TYPES.LIKED].data.unshift(action.data.like.post_id);

      return newState;
    case LIKE_ACTION_TYPES.REMOVE_LIKE:
      _.remove(newState[action.data.userId][POST_TYPES.LIKED].data, (postId) => {
        return postId === action.data.like.post_id;
      });

      return newState;

    //--------------------------------------------------------------------//
    // Other Actions
    //--------------------------------------------------------------------//

    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsReducer;
