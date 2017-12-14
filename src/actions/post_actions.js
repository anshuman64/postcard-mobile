// Local Imports
import * as APIUtility from '../utilities/api_utility';

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
  RECEIVE_POSTS: 'RECEIVE_POSTS',
  REFRESH_POSTS: 'REFRESH_POSTS',
  RECEIVE_POST:  'RECEIVE_POST',
  REMOVE_POST:   'REMOVE_POST'
};


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receivePosts = (data) => {
  return { type: POST_ACTION_TYPES.RECEIVE_POSTS, data: data };
};

export const refreshPosts = (data) => {
  return { type: POST_ACTION_TYPES.REFRESH_POSTS, data: data };
};

export const receivePost = (data) => {
  return { type: POST_ACTION_TYPES.RECEIVE_POST, data: data };
};

export const removePost = (data) => {
  return { type: POST_ACTION_TYPES.REMOVE_POST, data: data };
};


//--------------------------------------------------------------------//
// API Calls
//--------------------------------------------------------------------//


export const getPosts = (authToken, postType, queryParams) => (dispatch) => {
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

  return APIUtility.get(authToken, '/posts' + getRouteForPostType(postType), queryParams)
    .then((posts) => {
      dispatch(receivePosts({posts: posts, postType: postType}));
    });
};

export const refreshAndGetPosts = (authToken, postType, queryParams) => (dispatch) => {
  dispatch(refreshPosts({postType: postType}));
  dispatch(getPosts(authToken, postType, queryParams));
};

export const createPost = (authToken, postObj) => (dispatch) => {
  return APIUtility.post(authToken, '/posts', postObj)
    .then((newPost) => {
      dispatch(receivePost(newPost));
    });
};

export const deletePost = (authToken, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/posts/' + postId)
    .then((deletedPost) => {
      dispatch(removePost(deletedPost));
    });
};
