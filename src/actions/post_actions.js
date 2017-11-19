// Local Imports
import * as PostAPI from '../api/post_api';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST  = 'RECEIVE_POST';
export const REMOVE_POST   = 'REMOVE_POST';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const receivePosts = (data) => {
  return { type: RECEIVE_POSTS, data: data };
};

export const receivePost = (data) => {
  return { type: RECEIVE_POST, data: data };
};

export const removePost = (data) => {
  return { type: REMOVE_POST, data: data };
};


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//


export const getPosts = (queryParams) => (dispatch) => {
  return PostAPI.getPosts(queryParams).then((posts) => {
    dispatch(receivePosts(posts));
  });
};

export const createPost = (post) => (dispatch) => {
  return PostAPI.createPost(post).then((newPost) => {
    dispatch(receivePost(newPost));
  });
};

export const deletePost = (postId) => (dispatch) => {
  return PostAPI.deletePost(postId).then((deletedPost) => {
    dispatch(removePost(deletedPost));
  });
};
