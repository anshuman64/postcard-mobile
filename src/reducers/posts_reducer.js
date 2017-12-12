// Library Imports
import * as _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES } from '../actions/post_actions';

//--------------------------------------------------------------------//

// TODO: add lastUpdated
const DEFAULT_STATE = {
  allPosts:       [],
  authoredPosts:  [],
  likedPosts:     []
};

// TODO: add actions for new routes
const PostsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case POST_ACTION_TYPES.RECEIVE_ALL_POSTS:
      _.forEach(action.data, (post) => {
        newState.allPosts.push(post.id);
      });
      
      return newState;
    case POST_ACTION_TYPES.RECEIVE_AUTHORED_POSTS:
      _.forEach(action.data, (post) => {
        newState.authoredPosts.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_LIKED_POSTS:
      _.forEach(action.data, (post) => {
        newState.likedPosts.push(post.id);
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_POST:
      newState.allPosts.unshift(action.data.id);

      return newState;
    case POST_ACTION_TYPES.REMOVE_POST:
      _.remove(newState.allPosts, (postId) => {
        return postId === action.data.id;
      });

      _.remove(newState.authoredPosts, (postId) => {
        return postId === action.data.id;
      });

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsReducer;
