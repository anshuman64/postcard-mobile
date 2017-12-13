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
    case POST_ACTION_TYPES.RECEIVE_ALL_POSTS:
      if (newState.allPosts.data.length === 0) {
        newState.allPosts.lastUpdated = new Date();
      } else if (!(action.data[0].id < newState.allPosts.data[newState.allPosts.data.length-1])) {
        newState.allPosts.data = [];
        newState.allPosts.lastUpdated = new Date();
      }

      _.forEach(action.data, (post) => {
        newState.allPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_AUTHORED_POSTS:
      if (newState.authoredPosts.data.length === 0) {
        newState.authoredPosts.lastUpdated = new Date();
      } else if (!(action.data[0].id < newState.authoredPosts.data[newState.authoredPosts.data.length-1])) {
        newState.authoredPosts.data = [];
        newState.authoredPosts.lastUpdated = new Date();
      }

      _.forEach(action.data, (post) => {
        newState.authoredPosts.data.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_LIKED_POSTS:
      if (newState.likedPosts.data.length === 0) {
        newState.likedPosts.lastUpdated = new Date();
      } else if (!(action.data[0].id < newState.likedPosts.data[newState.likedPosts.data.length-1])) {
        newState.likedPosts.data = [];
        newState.likedPosts.lastUpdated = new Date();
      }

      _.forEach(action.data, (post) => {
        newState.likedPosts.data.push(post.id);
      });

      return newState;
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
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsReducer;
