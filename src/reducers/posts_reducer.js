// Library Imports
import _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES, POST_TYPES } from '../actions/post_actions.js';
import { LIKE_ACTION_TYPES }             from '../actions/like_actions.js';
import { mergeSorted }                   from '../utilities/function_utility.js';

//--------------------------------------------------------------------//


const DEFAULT_STATE = {
  allPosts:      { data: [], lastUpdated: null, isEnd: false },
  authoredPosts: { data: [], lastUpdated: null, isEnd: false },
  likedPosts:    { data: [], lastUpdated: null, isEnd: false },
};

const PostsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Get and Refresh Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POSTS:
      let handleReceivePosts = (type) => {
        if (action.data.posts.length === 0) {
          newState[type].isEnd = true;
        } else {
          _.forEach(action.data.posts, (post) => {
            newState[type].data.push(post.id);
          });
        }
      };

      switch (action.data.postType) {
        case POST_TYPES.ALL:
          handleReceivePosts('allPosts');
          break;
        case POST_TYPES.AUTHORED:
          handleReceivePosts('authoredPosts');
          break;
        case POST_TYPES.LIKED:
          handleReceivePosts('likedPosts');
          break;
      }

      return newState;
    case POST_ACTION_TYPES.REFRESH_POSTS:
      let handleRefreshPosts = (type) => {
        if (action.data.posts.length < 10) { // 10 = number of posts fetched
          newState[type].isEnd = true;
        } else {
          newState[type].data        = mergeSorted(newState[type].data, action.data.posts.map(post => post.id));
          newState[type].lastUpdated = new Date();
          newState[type].isEnd       = false;
        }
      };

      switch (action.data.postType) {
        case POST_TYPES.ALL:
          handleRefreshPosts('allPosts');
          break;
        case POST_TYPES.AUTHORED:
          handleRefreshPosts('authoredPosts');
          break;
        case POST_TYPES.LIKED:
          handleRefreshPosts('likedPosts');
          break;
      }

      return newState;

    //--------------------------------------------------------------------//
    // Create and Remove Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POST:
      // assumes that this case is only hit when the current user creates a post
      newState.allPosts.data.unshift(action.data.id);
      newState.authoredPosts.data.unshift(action.data.id);

      return newState;
    case POST_ACTION_TYPES.REMOVE_POST:
    // assumes that this case is only hit when the current user removes their own post
      _.remove(newState.allPosts.data, (postId) => {
        return postId === action.data.id;
      });

      _.remove(newState.authoredPosts.data, (postId) => {
        return postId === action.data.id;
      });

      return newState;

    //--------------------------------------------------------------------//
    // Like Post Actions
    //--------------------------------------------------------------------//

    case LIKE_ACTION_TYPES.RECEIVE_LIKE:
      newState.likedPosts.data.unshift(action.data.post_id);

      return newState;
    case LIKE_ACTION_TYPES.REMOVE_LIKE:
      _.remove(newState.likedPosts.data, (postId) => {
        return postId === action.data.post_id;
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
