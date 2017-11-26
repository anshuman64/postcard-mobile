// Library Imports
import * as _ from 'lodash';

// Local Imports
import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/post_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  allPosts: [],
  myPosts:  []
};

const PostsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case RECEIVE_POSTS:
      _.forEach(action.data, (post) => {
        newState.allPosts.push(post.id);
      });

      // TODO: figure out how to add it to "myPosts"

      return newState;
    case RECEIVE_POST:
      newState.allPosts.unshift(action.data.id);

      // TODO: figure out how to add it to "myPosts"

      return newState;
    case REMOVE_POST:
      _.remove(newState.allPosts, (postId) => {
        return postId === action.data.id;
      });

      _.remove(newState.myPosts, (postId) => {
        return postId === action.data.id;
      });

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsReducer;
