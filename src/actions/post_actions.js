// Local Imports
import * as APIUtility from '../utilities/api_utility.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const POST_TYPES = {
  ALL:      'ALL',
  AUTHORED: 'AUTHORED',
  LIKED:    'LIKED'
}

export const POST_ACTION_TYPES = {
  RECEIVE_POSTS:      'RECEIVE_POSTS',
  REFRESH_POSTS:      'REFRESH_POSTS',
  RECEIVE_POST:       'RECEIVE_POST',
  REMOVE_POST:        'REMOVE_POST',
  STOP_SCROLL_TO_TOP: 'STOP_SCROLL_TO_TOP'
};


//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//


let getRouteForPostType = (postType) => {
  switch(postType) {
    case POST_TYPES.ALL:
      return '';
    case POST_TYPES.AUTHORED:
      return '/authored';
    case POST_TYPES.LIKED:
      return '/liked';
  }
}


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const receivePosts = (data) => {
  return { type: POST_ACTION_TYPES.RECEIVE_POSTS, data: data };
};

export const refreshAndReceivePosts = (data) => {
  return { type: POST_ACTION_TYPES.REFRESH_POSTS, data: data };
};

export const receivePost = (data) => {
  return { type: POST_ACTION_TYPES.RECEIVE_POST, data: data };
};

export const removePost = (data) => {
  return { type: POST_ACTION_TYPES.REMOVE_POST, data: data };
};

export const stopScrollToTop = (data) => {
  return { type: POST_ACTION_TYPES.STOP_SCROLL_TO_TOP, data: data };
}


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//


export const getPosts = (authToken, postType, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts' + getRouteForPostType(postType), queryParams)
    .then((posts) => {
      dispatch(receivePosts({posts: posts, postType: postType}));
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'GET posts failed'
      }

      throw error;
    });
};

export const refreshPosts = (authToken, postType, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts' + getRouteForPostType(postType), queryParams)
    .then((posts) => {
      dispatch(refreshAndReceivePosts({posts: posts, postType: postType}));
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'GET posts failed'
      }

      throw error;
    });
};

export const createPost = (authToken, postObj) => (dispatch) => {
  return APIUtility.post(authToken, '/posts', postObj)
    .then((newPost) => {
      dispatch(receivePost(newPost));
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'POST post failed'
      }

      throw error;
    });
};

export const deletePost = (authToken, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/posts/' + postId)
    .catch((error) => {
      if (!error.description) {
        error.description = 'DEL post failed'
      }

      throw error;
    });
};
