// Library Imports
import _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES }   from '../actions/post_actions.js';
import { LIKE_ACTION_TYPES }   from '../actions/like_actions.js';
import { FOLLOW_ACTION_TYPES } from '../actions/follow_actions.js';

//--------------------------------------------------------------------//


const DEFAULT_STATE = {};

const PostsCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case POST_ACTION_TYPES.RECEIVE_POSTS:
    case POST_ACTION_TYPES.REFRESH_POSTS:
      _.forEach(action.data.posts, (post) => {
        newState[post.id] = post;
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_POST:
      newState[action.data.post.id] = action.data.post;

      return newState;
    case POST_ACTION_TYPES.REMOVE_POST:
      _.remove(newState, (postId) => {
        return postId === action.data.post.id;
      });

      return newState;
    case LIKE_ACTION_TYPES.RECEIVE_LIKE:
      postToUpdate = newState[action.data.like.post_id];

      postToUpdate.num_likes++;
      postToUpdate.is_liked_by_user = true;

      return newState;
    case LIKE_ACTION_TYPES.REMOVE_LIKE:
      postToUpdate = newState[action.data.like.post_id];

      postToUpdate.num_likes--;
      postToUpdate.is_liked_by_user = false;

      return newState;
    case FOLLOW_ACTION_TYPES.RECEIVE_FOLLOW:
      _.forEach(newState, (post) => {
        if (post.author_id === action.data.follow.followee_id) {
          post.is_author_followed_by_user = true;
        }
      });

      return newState;
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
