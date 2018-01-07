// Local Imports
import { amplitude }        from '../utilities/analytics_utility.js';
import * as APIUtility      from '../utilities/api_utility.js';
import { refreshAuthToken } from './user_actions.js';

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


export const getPosts = (authToken, firebaseUserObj, postType, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts' + getRouteForPostType(postType), queryParams)
    .then((posts) => {
      dispatch(receivePosts({posts: posts, postType: postType}));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj))
          .then((newAuthToken) => {
            return dispatch(getPosts(newAuthToken, firebaseUserObj, postType, queryParams));
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

export const refreshPosts = (authToken, firebaseUserObj, postType, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts' + getRouteForPostType(postType), queryParams)
    .then((posts) => {
      dispatch(refreshAndReceivePosts({posts: posts, postType: postType}));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(error, firebaseUserObj, refreshPosts, postType, queryParams));
      }

      if (!error.description) {
        error.description = 'GET posts failed'
      }

      throw error;
    });
};

export const createPost = (authToken, firebaseUserObj, postObj) => (dispatch) => {
  return APIUtility.post(authToken, '/posts', postObj)
    .then((newPost) => {
      amplitude.logEvent('Engagement - Create Post', { is_successful: true, body: postObj.body });
      dispatch(receivePost(newPost));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(error, firebaseUserObj, createPost, postObj));
      }

      if (!error.description) {
        error.description = 'POST post failed'
      }

      amplitude.logEvent('Engagement - Create Post', { is_successful: false, body: postObj.body, error: error.description });
      throw error;
    });
};

export const deletePost = (authToken, firebaseUserObj, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/posts/' + postId)
    .then((delPost) => {
      amplitude.logEvent('Engagement - Delete Post', { is_successful: true, body: delPost.body });

      return new Promise.resolve(delPost);
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(error, firebaseUserObj, deletePost, postId));
      }

      if (!error.description) {
        error.description = 'DEL post failed'
      }

      amplitude.logEvent('Engagement - Delete Post', { is_successful: false, error: error.description });
      throw error;
    });
};
