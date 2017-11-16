// Library Imports
import * as _ from 'lodash';

// Local Imports
import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/post_actions';
import { RECEIVE_LIKE, REMOVE_LIKE }                from '../actions/like_actions';

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//


const PostsCacheReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_POSTS:
      return;
    case RECEIVE_POST:
      return;
    case REMOVE_POST:
      return;
    case RECEIVE_LIKE:
      return;
    case REMOVE_LIKE:
      return;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//
//--------------------------------------------------------------------//

export default PostsCacheReducer;