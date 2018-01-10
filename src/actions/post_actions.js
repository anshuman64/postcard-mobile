// Local Imports
import { amplitude }        from '../utilities/analytics_utility.js';
import * as APIUtility      from '../utilities/api_utility.js';
import { refreshAuthToken } from './user_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const POST_TYPES = {
  ALL:      'allPosts',
  AUTHORED: 'authoredPosts',
  LIKED:    'likedPosts'
}

export const POST_ACTION_TYPES = {
  RECEIVE_POSTS:      'RECEIVE_POSTS',
  REFRESH_POSTS:      'REFRESH_POSTS',
  RECEIVE_POST:       'RECEIVE_POST',
  REMOVE_POST:        'REMOVE_POST',
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


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//


export const getPosts = (authToken, firebaseUserObj, userId, postType, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts' + getRouteForPostType(postType), queryParams)
    .then((posts) => {
      dispatch(receivePosts({ posts: posts, userId: userId, postType: postType }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj))
          .then((newAuthToken) => {
            return dispatch(getPosts(newAuthToken, firebaseUserObj, userId, postType, queryParams));
          })
          .catch((error) => {
            throw error;
          })
      }

      if (!error.description) {
        error.description = 'GET posts failed'
      }

      throw error;
    });
};

export const refreshPosts = (authToken, firebaseUserObj, userId, postType, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts' + getRouteForPostType(postType), queryParams)
    .then((posts) => {
      dispatch(refreshAndReceivePosts({ posts: posts, userId: userId, postType: postType }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, refreshPosts, userId, postType, queryParams));
      }

      if (!error.description) {
        error.description = 'GET posts failed'
      }

      throw error;
    });
};

export const createPost = (authToken, firebaseUserObj, userId, postObj) => (dispatch) => {
  return APIUtility.post(authToken, '/posts', postObj)
    .then((newPost) => {
      amplitude.logEvent('Engagement - Create Post', { is_successful: true, body: postObj.body });
      dispatch(receivePost({ post: newPost, userId: userId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createPost, userId, postObj));
      }

      if (!error.description) {
        error.description = 'POST post failed'
      }

      amplitude.logEvent('Engagement - Create Post', { is_successful: false, body: postObj.body, error: error.description });
      throw error;
    });
};

export const deletePost = (authToken, firebaseUserObj, userId, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/posts/' + postId)
    .then((delPost) => {
      amplitude.logEvent('Engagement - Delete Post', { is_successful: true, body: delPost.body });

      return new Promise.resolve(delPost);
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deletePost, userId, postId));
      }

      if (!error.description) {
        error.description = 'DEL post failed'
      }

      amplitude.logEvent('Engagement - Delete Post', { is_successful: false, error: error.description });
      throw error;
    });
};
