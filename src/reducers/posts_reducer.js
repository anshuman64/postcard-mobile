// Library Imports
import * as _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES, POST_TYPES } from '../actions/post_actions';

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
    case POST_ACTION_TYPES.RECEIVE_POSTS:
      if (action.data.posts.length === 0) {
        switch (action.data.postType) {
          case POST_TYPES.ALL:
            newState.allPosts.isEnd = true;
          case POST_TYPES.AUTHORED:
            newState.authoredPosts.isEnd = true;
          case POST_TYPES.LIKED:
            newState.likedPosts.isEnd = true;
        }

        return newState;
      }

      switch (action.data.postType) {
        case POST_TYPES.ALL:
          _.forEach(action.data.posts, (post) => {
            newState.allPosts.data.push(post.id);
          });
        case POST_TYPES.AUTHORED:
          _.forEach(action.data.posts, (post) => {
            newState.authoredPosts.data.push(post.id);
          });
        case POST_TYPES.LIKED:
          _.forEach(action.data.posts, (post) => {
            newState.likedPosts.data.push(post.id);
          });
      }

      return newState;
    case POST_ACTION_TYPES.REFRESH_POSTS:
      switch (action.data.postType) {
        case POST_TYPES.ALL:
          newState.allPosts.data = [];
          newState.allPosts.lastUpdated = new Date();
          newState.allPosts.isEnd = false;
        case POST_TYPES.AUTHORED:
          newState.authoredPosts.data = [];
          newState.authoredPosts.lastUpdated = new Date();
          newState.authoredPosts.isEnd = false;
        case POST_TYPES.LIKED:
          newState.likedPosts.data = [];
          newState.likedPosts.lastUpdated = new Date();
          newState.likedPosts.isEnd = false;
      }

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
