// Local Imports
import * as APIUtility from '../utilities/api_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const POST_ACTION_TYPES = {
  REFRESH_ALL_POSTS:      'REFRESH_ALL_POSTS',
  REFRESH_AUTHORED_POSTS: 'REFRESH_AUTHORED_POSTS',
  REFRESH_LIKED_POSTS:    'REFRESH_LIKED_POSTS',
  RECEIVE_ALL_POSTS:      'RECEIVE_ALL_POSTS',
  RECEIVE_AUTHORED_POSTS: 'RECEIVE_AUTHORED_POSTS',
  RECEIVE_LIKED_POSTS:    'RECEIVE_LIKED_POSTS',
  RECEIVE_POST:           'RECEIVE_POST',
  REMOVE_POST:            'REMOVE_POST'
};


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const refreshAllPosts = (data) => {
  return { type: POST_ACTION_TYPES.REFRESH_ALL_POSTS, data: data };
};

export const refreshAuthoredPosts = (data) => {
  return { type: POST_ACTION_TYPES.REFRESH_AUTHORED_POSTS, data: data };
};

export const refreshLikedPosts = (data) => {
  return { type: POST_ACTION_TYPES.REFRESH_LIKED_POSTS, data: data };
};

export const receiveAllPosts = (data) => {
  return { type: POST_ACTION_TYPES.RECEIVE_ALL_POSTS, data: data };
};

export const receiveAuthoredPosts = (data) => {
  return { type: POST_ACTION_TYPES.RECEIVE_AUTHORED_POSTS, data: data };
};

export const receiveLikedPosts = (data) => {
  return { type: POST_ACTION_TYPES.RECEIVE_LIKED_POSTS, data: data };
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


export const getAllPosts = (authToken, queryParams, isRefresh) => (dispatch) => {
  return APIUtility.get(authToken, '/posts', queryParams)
    .then((posts) => {
      if (isRefresh) {
        dispatch(refreshAllPosts(posts));
      } else {
        dispatch(receiveAllPosts(posts));
      }
    });
};

export const getAuthoredPosts = (authToken, queryParams, isRefresh) => (dispatch) => {
  return APIUtility.get(authToken, '/posts/authored', queryParams)
    .then((posts) => {
      if (isRefresh) {
        dispatch(refreshAuthoredPosts(posts));
      } else {
        dispatch(receiveAuthoredPosts(posts));
      }
    });
};

export const getLikedPosts = (authToken, queryParams, isRefresh) => (dispatch) => {
  return APIUtility.get(authToken, '/posts/liked', queryParams)
    .then((posts) => {
      if (isRefresh) {
        dispatch(refreshLikedPosts(posts));
      } else {
        dispatch(receiveLikedPosts(posts));
      }
    });
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
