// Library Imports
import * as _ from 'lodash';

// Local Imports
import { getImage }            from './image_actions.js';
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';
import { refreshAuthToken }    from './user_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const POST_TYPES = {
  ALL:      'allPosts',
  AUTHORED: 'authoredPosts',
  LIKED:    'likedPosts',
  FOLLOWED: 'followedPosts'
}

export const POST_ACTION_TYPES = {
  RECEIVE_POSTS:      'RECEIVE_POSTS',
  REFRESH_POSTS:      'REFRESH_POSTS',
  RECEIVE_POST:       'RECEIVE_POST',
  REMOVE_POST:        'REMOVE_POST',
};

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
// Helpers
//--------------------------------------------------------------------//

// Returns API path for particular POST_TYPES
let getRouteForPostType = (postType, userId) => {
  switch(postType) {
    case POST_TYPES.ALL:
      return '';
    case POST_TYPES.AUTHORED:
      return '/authored/' + userId;
    case POST_TYPES.LIKED:
      return '/liked/' + userId;
    case POST_TYPES.FOLLOWED:
      return '/followed';
  }
}

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// GET posts from API and append to current PostList
export const getPosts = (authToken, firebaseUserObj, userId, postType, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts' + getRouteForPostType(postType, userId), queryParams)
    .then((posts) => {
      dispatch(receivePosts({ posts: posts, userId: userId, postType: postType }));

      _.forEach(posts, (post) => {
        if (post.image_url) {
          dispatch(getImage(firebaseUserObj, post.image_url));
        }

        if (post.author_avatar_url) {
          dispatch(getImage(firebaseUserObj, post.author_avatar_url));
        }
      });
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getPosts, userId, postType, queryParams));
      }

      throw setErrorDescription(error, 'GET posts failed');
    });
};

// GET latest posts from API and merge with current PostList
export const refreshPosts = (authToken, firebaseUserObj, userId, postType, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts' + getRouteForPostType(postType, userId), queryParams)
    .then((posts) => {
      dispatch(refreshAndReceivePosts({ posts: posts, userId: userId, postType: postType }));

      _.forEach(posts, (post) => {
        if (post.image_url) {
          dispatch(getImage(firebaseUserObj, post.image_url));
        }

        if (post.author_avatar_url) {
          dispatch(getImage(firebaseUserObj, post.author_avatar_url));
        }
      });
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, refreshPosts, userId, postType, queryParams));
      }

      throw setErrorDescription(error, 'Refresh posts failed');
    });
};

// Create post to API from Header of NewPostScreen
export const createPost = (authToken, firebaseUserObj, userId, postBody, postImage, placeholderText) => (dispatch) => {
  return APIUtility.post(authToken, '/posts', { body: postBody, image_url: postImage })
    .then((newPost) => {
      amplitude.logEvent('Engagement - Create Post', { is_successful: true, body: postBody, image: postImage ? true : false, placeholder_text: placeholderText });
      dispatch(receivePost({ post: newPost, userId: userId }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, createPost, userId, postBody, postImage, placeholderText));
      }

      amplitude.logEvent('Engagement - Create Post', { is_successful: false, body: postBody, image: postImage ? true : false, placeholder_text: placeholderText, error_description: error.description, error_message: error.message });
      throw setErrorDescription(error, 'POST post failed');
    });
};

// Delete post to API from PostListItem
export const deletePost = (authToken, firebaseUserObj, userId, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/posts/' + postId)
    .then((delPost) => {
      amplitude.logEvent('Engagement - Delete Post', { is_successful: true, body: delPost.body });

      return delPost;
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deletePost, userId, postId));
      }

      amplitude.logEvent('Engagement - Delete Post', { is_successful: false, error_description: error.description, error_message: error.message });
      throw setErrorDescription(error, 'DEL post failed');
    });
};
