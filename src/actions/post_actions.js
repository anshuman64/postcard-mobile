// Local Imports
import * as APIUtility from '../utilities/api_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const POST_ACTION_TYPES = {
  RECEIVE_ALL_POSTS:      'RECEIVE_ALL_POSTS',
  RECEIVE_AUTHORED_POSTS: 'RECEIVE_AUTHORED_POSTS',
  RECEIVE_LIKED_POSTS:    'RECEIVE_LIKED_POSTS',
  RECEIVE_POST:           'RECEIVE_POST',
  REMOVE_POST:            'REMOVE_POST'
};


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

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


export const getAllPosts = (authToken, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts', queryParams)
    .then((posts) => {
      dispatch(receiveAllPosts(posts));
    });
};

export const getAuthoredPosts = (authToken, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts/authored', queryParams)
    .then((posts) => {
      dispatch(receiveAuthoredPosts(posts));
    });
};

export const getLikedPosts = (authToken, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts/liked', queryParams)
    .then((posts) => {
      dispatch(receiveLikedPosts(posts));
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
