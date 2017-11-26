// Library Imports
import * as _ from 'lodash';

// Local Imports
import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/post_actions';
import { RECEIVE_LIKE, REMOVE_LIKE }                from '../actions/like_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {};

const PostsCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case RECEIVE_POSTS:
      _.forEach(action.data, (post) => {
        newState[post.id] = post;
      });

      return newState;
    case RECEIVE_POST:
      newState[action.data.id] = action.data;

      return newState;
    case REMOVE_POST:
      delete newState[action.data.id];

      return newState;
    case RECEIVE_LIKE:
      newState[action.data.post_id].num_likes++;

      return newState;
    case REMOVE_LIKE:
      newState[action.data.post_id].num_likes--;

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsCacheReducer;
