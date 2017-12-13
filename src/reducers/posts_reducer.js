// Library Imports
import * as _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES } from '../actions/post_actions';

//--------------------------------------------------------------------//

// TODO: add lastUpdated
const DEFAULT_STATE = {
  allPosts: {
    data:         [],
    lastUpdated:  null
  },
  authoredPosts: {
    data:         [],
    lastUpdated:  null
  },
  likedPosts: {
    data:         [],
    lastUpdated:  null
  },
};

// TODO: add actions for new routes
const PostsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case POST_ACTION_TYPES.REFRESH_ALL_POSTS:
      newState.allPosts.data = [];
      newState.allPosts.lastUpdated = new Date();

      _.forEach(action.data, (post) => {
        newState.allPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.REFRESH_AUTHORED_POSTS:
      newState.authoredPosts.data = [];
      newState.authoredPosts.lastUpdated = new Date();

      _.forEach(action.data, (post) => {
        newState.authoredPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.REFRESH_LIKED_POSTS:
      newState.likedPosts.data = [];
      newState.likedPosts.lastUpdated = new Date();

      _.forEach(action.data, (post) => {
        newState.likedPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_ALL_POSTS:
      _.forEach(action.data, (post) => {
        newState.allPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_AUTHORED_POSTS:
      _.forEach(action.data, (post) => {
        newState.authoredPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_LIKED_POSTS:
      _.forEach(action.data, (post) => {
        newState.likedPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_POST:
      newState.allPosts.data.unshift(action.data.id);

      return newState;
    case POST_ACTION_TYPES.REMOVE_POST:
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
