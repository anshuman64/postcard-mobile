// Library Imports
import * as _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES } from '../actions/post_actions';
import { LIKE_ACTION_TYPES } from '../actions/like_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {};

const PostsCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case POST_ACTION_TYPES.REFRESH_ALL_POSTS:
    case POST_ACTION_TYPES.RECEIVE_ALL_POSTS:
      _.forEach(action.data, (post) => {
        newState[post.id] = post;
      });

      return newState;
    case POST_ACTION_TYPES.RECEIVE_POST:
      newState[action.data.id] = action.data;

      return newState;
    case LIKE_ACTION_TYPES.RECEIVE_LIKE:
      newState[action.data.post_id].num_likes++;

      return newState;
    case LIKE_ACTION_TYPES.REMOVE_LIKE:
      newState[action.data.post_id].num_likes--;

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsCacheReducer;
