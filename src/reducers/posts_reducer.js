// Library Imports
import * as _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES, POST_TYPES } from '../actions/post_actions.js';
import { LIKE_ACTION_TYPES }             from '../actions/like_actions.js';
import { mergeSorted }                   from '../utilities/function_utility.js';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  allPosts: {
    data:         [],
    lastUpdated:  null,
    isEnd:        false,
  },
  authoredPosts: {
    data:         [],
    lastUpdated:  null,
    isEnd:        false,
  },
  likedPosts: {
    data:         [],
    lastUpdated:  null,
    isEnd:        false,
  },
};


const PostsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Get and Refresh Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POSTS:
      if (action.data.posts.length === 0) {
        switch (action.data.postType) {
          case POST_TYPES.ALL:
            newState.allPosts.isEnd = true;
            break;
          case POST_TYPES.AUTHORED:
            newState.authoredPosts.isEnd = true;
            break;
          case POST_TYPES.LIKED:
            newState.likedPosts.isEnd = true;
            break;
        }

        return newState;
      }

      switch (action.data.postType) {
        case POST_TYPES.ALL:
          _.forEach(action.data.posts, (post) => {
            newState.allPosts.data.push(post.id);
          });
          break;
        case POST_TYPES.AUTHORED:
          _.forEach(action.data.posts, (post) => {
            newState.authoredPosts.data.push(post.id);
          });
          break;
        case POST_TYPES.LIKED:
          _.forEach(action.data.posts, (post) => {
            newState.likedPosts.data.push(post.id);
          });
          break;
      }

      return newState;

    case POST_ACTION_TYPES.REFRESH_POSTS:
      switch (action.data.postType) {
        case POST_TYPES.ALL:
          if (action.data.posts.length === 0) {
            newState.allPosts.isEnd = true;
            break;
          }

          newState.allPosts.data = mergeSorted(newState.allPosts.data, action.data.posts.map(post => post.id));
          newState.allPosts.lastUpdated = new Date();
          newState.allPosts.isEnd = false;
          break;
        case POST_TYPES.AUTHORED:
          if (action.data.posts.length === 0) {
            newState.authoredPosts.isEnd = true;
            break;
          }

          newState.authoredPosts.data = mergeSorted(newState.authoredPosts.data, action.data.posts.map(post => post.id));
          newState.authoredPosts.lastUpdated = new Date();
          newState.authoredPosts.isEnd = false;
          break;
        case POST_TYPES.LIKED:
          if (action.data.posts.length === 0) {
            newState.likedPosts.isEnd = true;
            break;
          }

          newState.likedPosts.data = mergeSorted(newState.likedPosts.data, action.data.posts.map(post => post.id));
          newState.likedPosts.lastUpdated = new Date();
          newState.likedPosts.isEnd = false;
          break;
      }

      return newState;

    //--------------------------------------------------------------------//
    // Create and Remove Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POST:
      newState.allPosts.data.unshift(action.data.id);
      newState.authoredPosts.data.unshift(action.data.id);

      return newState;
    case POST_ACTION_TYPES.REMOVE_POST:
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
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsReducer;
