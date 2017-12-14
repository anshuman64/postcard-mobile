// Library Imports
import * as _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES } from '../actions/post_actions';

//--------------------------------------------------------------------//

// TODO: add lastUpdated
const DEFAULT_STATE = {
  allPosts: {
    data:         [],
    lastUpdated:  null,
    isEnd:        false,
    isNew:        false,
  },
  authoredPosts: {
    data:         [],
    lastUpdated:  null,
    isEnd:        false,
    isNew:        false,
  },
  likedPosts: {
    data:         [],
    lastUpdated:  null,
    isEnd:        false,
    isNew:        false,
  },
};

// TODO: add actions for new routes
const PostsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Receive Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_ALL_POSTS:
      newState.allPosts.isNew = false;

      if (action.data.length === 0) {
        newState.allPosts.isEnd = true;
        return newState;
      }

      _.forEach(action.data, (post) => {
        newState.allPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_AUTHORED_POSTS:
      newState.authoredPosts.isNew = false;

      if (action.data.length === 0) {
        newState.authoredPosts.isEnd = true;
        return newState;
      }

      _.forEach(action.data, (post) => {
        newState.authoredPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_LIKED_POSTS:
      newState.likedPosts.isNew = false;

      if (action.data.length === 0) {
        newState.likedPosts.isEnd = true;
        return newState;
      }

      _.forEach(action.data, (post) => {
        newState.likedPosts.data.push(post.id);
      });

      return newState;

    //--------------------------------------------------------------------//
    // Refresh Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.REFRESH_ALL_POSTS:
      newState.allPosts.data = [];
      newState.allPosts.lastUpdated = new Date();
      newState.allPosts.isEnd = false;
      newState.allPosts.isNew = false;

      _.forEach(action.data, (post) => {
        newState.allPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.REFRESH_AUTHORED_POSTS:
      newState.authoredPosts.data = [];
      newState.authoredPosts.lastUpdated = new Date();
      newState.authoredPosts.isEnd = false;
      newState.authoredPosts.isNew = false;

      _.forEach(action.data, (post) => {
        newState.authoredPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.REFRESH_LIKED_POSTS:
      newState.likedPosts.data = [];
      newState.likedPosts.lastUpdated = new Date();
      newState.likedPosts.isEnd = false;
      newState.likedPosts.isNew = false;

      _.forEach(action.data, (post) => {
        newState.likedPosts.data.push(post.id);
      });

      return newState;

    //--------------------------------------------------------------------//
    // Other Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POST:
      newState.allPosts.isNew = true;
      newState.authoredPosts.isNew = true;

      newState.allPosts.data.unshift(action.data.id);
      newState.authoredPosts.data.unshift(action.data.id);

      return newState;
    case POST_ACTION_TYPES.REMOVE_POST:
      newState.allPosts.isNew = false;
      newState.authoredPosts.isNew = false;

      _.remove(newState.allPosts.data, (postId) => {
        return postId === action.data.id;
      });

      _.remove(newState.authoredPosts.data, (postId) => {
        return postId === action.data.id;
      });

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsReducer;
