// Local Imports
import { getImagesFromPosts }     from './image_actions.js';
import { amplitude }              from '../utilities/analytics_utility.js';
import * as APIUtility            from '../utilities/api_utility.js';
import { setErrorDescription }    from '../utilities/error_utility.js';
import { deleteFile, uploadFile } from '../utilities/file_utility.js';
import { refreshAuthToken }       from './client_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const POST_TYPES = {
  RECEIVED: 'receivedPosts',
  PUBLIC:   'publicPosts',
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
// Helpers
//--------------------------------------------------------------------//

// Returns API path for particular POST_TYPES
let getRouteForPostType = (postType, userId, isUser) => {
  switch(postType) {
    case POST_TYPES.RECEIVED:
      return '/received/';
    case POST_TYPES.PUBLIC:
      return '';
    case POST_TYPES.AUTHORED:
      if (isUser) {
        return '/authored';
      } else {
        return '/authored/' + userId;
      }
    case POST_TYPES.LIKED:
      if (isUser) {
        return '/liked';
      } else {
        return '/liked/' + userId;
      }
    case POST_TYPES.FOLLOWED:
      return '/followed';
  }
}

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// GET posts from API and append to current PostList
export const getPosts = (authToken, firebaseUserObj, isRefresh, userId, postType, isUser, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts' + getRouteForPostType(postType, userId, isUser), queryParams)
    .then((posts) => {
      if (isRefresh) {
        dispatch(refreshPosts({ posts: posts, userId: userId, postType: postType }));
      } else {
        dispatch(receivePosts({ posts: posts, userId: userId, postType: postType }));
      }

      dispatch(getImagesFromPosts(posts));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getPosts, userId, postType, isUser, queryParams));
      }

      throw setErrorDescription(error, 'GET posts failed');
    });
};

// Create post to API from Header of NewPostScreen
export const createPost = (authToken, firebaseUserObj, userId, postBody, postImagePath, postImageType, placeholderText) => (dispatch) => {
  let postPost = (imageKey) => {
    return APIUtility.post(authToken, '/posts', { body: postBody, image_url: imageKey })
      .then((newPost) => {
        amplitude.logEvent('Engagement - Create Post', { is_successful: true, body: postBody, image: imageKey ? true : false, placeholder_text: placeholderText });
        dispatch(receivePost({ post: newPost, userId: userId }));
        dispatch(getImagesFromPosts([newPost]));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshAuthToken(firebaseUserObj, createPost, userId, postBody, postImagePath, postImageType, placeholderText));
        }

        postPostError(error);
      });
  }

  let postPostError = (error) => {
    error = setErrorDescription(error, 'POST post failed');
    amplitude.logEvent('Engagement - Create Post', { is_successful: false, body: postBody, image: postImagePath ? true : false, placeholder_text: placeholderText, error_description: error.description, error_message: error.message });
    throw error;
  }

  if (postImagePath) {
    return dispatch(uploadFile(authToken, firebaseUserObj, postImagePath, postImageType, userId, 'posts/'))
      .then((data) => {
        return postPost(data.key);
      })
      .catch((error) => {
        postPostError(error);
      });
  } else {
    return postPost();
  }
};

// Delete post to API from PostListItem
export const deletePost = (authToken, firebaseUserObj, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/posts/' + postId)
    .then((delPost) => {
      amplitude.logEvent('Engagement - Delete Post', { is_successful: true, body: delPost.body });
      if (delPost.image_url) {
        dispatch(deleteFile(authToken, firebaseUserObj, delPost.image_url));
      }

      return delPost;
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, deletePost, postId));
      }

      error = setErrorDescription(error, 'DEL post failed');
      amplitude.logEvent('Engagement - Delete Post', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};
