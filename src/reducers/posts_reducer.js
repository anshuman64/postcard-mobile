// Library Imports
import _ from 'lodash';

// Local Imports
import { USER_ACTION_TYPES }             from '../actions/user_actions.js';
import { POST_ACTION_TYPES, POST_TYPES } from '../actions/post_actions.js';
import { LIKE_ACTION_TYPES }             from '../actions/like_actions.js';
import { FOLLOW_ACTION_TYPES }           from '../actions/follow_actions.js';
import { mergeSorted }                   from '../utilities/function_utility.js';

//--------------------------------------------------------------------//

/* Data is in the form {
 *   thisUserId: {
 *     allPosts:      { data: [], lastUpdated: null, isEnd: false },
 *     authoredPosts: { data: [], lastUpdated: null, isEnd: false }
 *     likedPosts:    { data: [], lastUpdated: null, isEnd: false }
 *     followedPosts: { data: [], lastUpdated: null, isEnd: false },
 *   },
 *   userId2: {
 *     authoredPosts: { data: [], lastUpdated: null, isEnd: false }
 *     likedPosts:    { data: [], lastUpdated: null, isEnd: false }
 *   },
 *   userId3: ...
 */

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

      _.forEach(POST_TYPES, (postTypes) => {
        newState[userId][postTypes]             = newState[userId][postTypes]             || {};
        newState[userId][postTypes].data        = newState[userId][postTypes].data        || [];
        newState[userId][postTypes].lastUpdated = newState[userId][postTypes].lastUpdated || new Date();
        newState[userId][postTypes].isEnd       = newState[userId][postTypes].isEnd       || false;
      })

      return newState;

    //--------------------------------------------------------------------//
    // Get and Refresh Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POSTS:
      postData = newState[action.data.userId][action.data.postType];

      if (action.data.posts.length === 0) {
        postData.isEnd = true;
      } else {
        _.forEach(action.data.posts, (post) => {
          postData.data.push(post.id);
        });
      }

      return newState;
    case POST_ACTION_TYPES.REFRESH_POSTS:
      userId   = action.data.userId;
      postType = action.data.postType;

      // Make sure objects exist
      newState[userId] = newState[userId] || {};
      postData = newState[userId][postType];

      _.forEach(POST_TYPES, (postTypes) => {
        newState[userId][postTypes]      = newState[userId][postTypes] || {};
        newState[userId][postTypes].data = newState[userId][postTypes].data || [];
      })

      postData.lastUpdated = new Date();
      if (postType === POST_TYPES.FOLLOWED) {
        postData.data = [];
      }

      if (action.data.posts.length < 10) { // 10 = number of posts fetched
        postData.isEnd = true;
      } else {
        postData.isEnd = false;
      }

      if (action.data.posts.length > 0) {
        postData.data = mergeSorted(postData.data, action.data.posts.map(post => post.id));
      }

      return newState;

    //--------------------------------------------------------------------//
    // Create and Remove Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POST:
      userId = action.data.userId;
      postId = action.data.post.id;

      // assumes that this case is only hit when the current user creates a post
      newState[userId][POST_TYPES.ALL].data.unshift(action.data.post.id);
      newState[userId][POST_TYPES.AUTHORED].data.unshift(action.data.post.id);

      return newState;
    case POST_ACTION_TYPES.REMOVE_POST:
      userId = action.data.userId;
      postId = action.data.post.id;

      // assumes that this case is only hit when the current user removes their own post
      _.remove(newState[userId][POST_TYPES.ALL].data, (postsId) => {
        return postsId === postId;
      });

      _.remove(newState[userId][POST_TYPES.AUTHORED].data, (postsId) => {
        return postsId === postId;
      });

      return newState;

    //--------------------------------------------------------------------//
    // Like Post Actions
    //--------------------------------------------------------------------//

    // TODO: add the liked post in the correct chronological spot
    case LIKE_ACTION_TYPES.RECEIVE_LIKE:
      userId = action.data.userId;
      postId = action.data.like.post_id;

      newState[userId][POST_TYPES.LIKED].data.unshift(postId);

      return newState;
    case LIKE_ACTION_TYPES.REMOVE_LIKE:
      userId = action.data.userId;
      postId = action.data.post.id;

      _.remove(newState[userId][POST_TYPES.LIKED].data, (postsId) => {
        return postsId === postId;
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
