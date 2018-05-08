// Library Imports
import _ from 'lodash';

// Local Imports
import { amplitude }               from '../utilities/analytics_utility';
import * as APIUtility             from '../utilities/api_utility';
import { setErrorDescription }     from '../utilities/error_utility';
import { deleteFile, uploadMedia } from '../utilities/file_utility';
import { refreshAuthToken }        from './client_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const POST_TYPES = {
  RECEIVED: 'receivedPosts',
  AUTHORED: 'authoredPosts',
  LIKED:    'likedPosts',
}

export const POST_ACTION_TYPES = {
  RECEIVE_POSTS:               'RECEIVE_POSTS',
  REFRESH_POSTS:               'REFRESH_POSTS',
  RECEIVE_POST:                'RECEIVE_POST',
  REMOVE_POST:                 'REMOVE_POST',
  PUSHER_RECEIVE_POST:         'PUSHER_RECEIVE_POST',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// posts (array): array of post objects
// userId (int): user id of who the post belongs to
// postType (string): one of POST_TYPES
export const receivePosts = (data) => {
  return { type: POST_ACTION_TYPES.RECEIVE_POSTS, data: data };
};

// posts (array): array of post objects
// userId (int): user id of who the post belongs to
// postType (string): one of POST_TYPES
export const refreshPosts = (data) => {
  return { type: POST_ACTION_TYPES.REFRESH_POSTS, data: data };
};

// post (post object): post object of created post
// clientId (int): client's id
// recipientIds (array): array of user and group ids
// contactPhoneNumbers (array): array of phone numbers of contacts the post was sent to
export const receivePost = (data) => {
  return { type: POST_ACTION_TYPES.RECEIVE_POST, data: data };
};

// post (post object): post object of deleted post
// clientId (int): client's id
export const removePost = (data) => {
  return { type: POST_ACTION_TYPES.REMOVE_POST, data: data };
};

// clientId (int): client's id
// post (post object): post object
export const pusherReceivePost = (data) => {
  return { type: POST_ACTION_TYPES.PUSHER_RECEIVE_POST, data: data };
};

//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//

// Returns API path for particular POST_TYPES
let getRouteForPostType = (postType, userId, isClient) => {
  switch(postType) {
    case POST_TYPES.RECEIVED:
      return '/';
    case POST_TYPES.AUTHORED:
      if (isClient) {
        return '/authored';
      } else {
        return '/authored/' + userId;
      }
    case POST_TYPES.LIKED:
      if (isClient) {
        return '/liked';
      } else {
        return '/liked/' + userId;
      }
  }
}

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// GET posts from API and append to current PostList
export const getPosts = (authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/posts' + getRouteForPostType(postType, userId, isClient), queryParams)
    .then((posts) => {
      if (isRefresh) {
        dispatch(refreshPosts({ posts: posts, userId: userId, postType: postType }));
      } else {
        dispatch(receivePosts({ posts: posts, userId: userId, postType: postType }));
      }
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future." || error.message === 'Token refresh in progress') {
        return dispatch(refreshAuthToken(firebaseUserObj, getPosts, isRefresh, userId, postType, isClient, queryParams));
      }

      error = setErrorDescription(error, 'GET posts failed');
      amplitude.logEvent('Posts - Get Posts', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Create post to API from Header of NewPostScreen
export const createPost = (authToken, firebaseUserObj, clientId, recipientIds, contactPhoneNumbers, postBody, media, placeholderText) => (dispatch) => {
  let postPostError = (error) => {
    error = setErrorDescription(error, 'POST post failed');
    amplitude.logEvent('Posts - Create Post', { is_successful: false, body: postBody, num_media: media.length, placeholder_text: placeholderText, num_recipients: recipientIds.length, error_description: error.description, error_message: error.message });
    throw error;
  }

  let recipientIdsToSend = [];
  let groupIdsToSend = [];

  _.forEach(recipientIds, (recipientId) => {
    if (recipientId > 0) {
      recipientIdsToSend.push(recipientId);
    } else {
      groupIdsToSend.push(-1 * recipientId);
    }
  });

  return dispatch(uploadMedia(authToken, firebaseUserObj, clientId, 'posts/', media))
    .then((updatedMedia) => {
      return APIUtility.post(authToken, '/posts', { body: postBody, media: media && media.length > 0 ? updatedMedia : null, recipient_ids: recipientIdsToSend, contact_phone_numbers: contactPhoneNumbers, group_ids: groupIdsToSend })
        .then((newPost) => {
          amplitude.logEvent('Posts - Create Post', { is_successful: true, body: postBody, num_media: media.length, num_recipients: recipientIds.length, num_group_recipients: groupIdsToSend.length, num_contact_recipients: contactPhoneNumbers.length, placeholder_text: placeholderText });
          dispatch(receivePost({ post: newPost, clientId: clientId, recipientIds: recipientIds, contactPhoneNumbers: contactPhoneNumbers }));
        })
        .catch((error) => {
          if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future." || error.message === 'Token refresh in progress') {
            return dispatch(refreshAuthToken(firebaseUserObj, createPost, clientId, recipientIds, contactPhoneNumbers, postBody, media, placeholderText));
          }

          postPostError(error);
        });
    })
    .catch((error) => {
      postPostError(error);
    });
};

// Forward post to API from Header of ShareScreen
export const forwardPost = (authToken, firebaseUserObj, clientId, recipientIds, contactPhoneNumbers, postId) => (dispatch) => {
  let recipientIdsToSend = [];
  let groupIdsToSend = [];

  _.forEach(recipientIds, (recipientId) => {
    if (recipientId > 0) {
      recipientIdsToSend.push(recipientId);
    } else {
      groupIdsToSend.push(-1 * recipientId);
    }
  });

  return APIUtility.post(authToken, '/posts', { post_id: postId, recipient_ids: recipientIdsToSend, contact_phone_numbers: contactPhoneNumbers, group_ids: groupIdsToSend })
    .then((newPost) => {
      amplitude.logEvent('Posts - Forward Post', { is_successful: true, num_recipients: recipientIds.length, num_group_recipients: groupIdsToSend.length, num_contact_recipients: contactPhoneNumbers.length });
      dispatch(receivePost({ post: newPost, clientId: clientId, recipientIds: recipientIds, contactPhoneNumbers: contactPhoneNumbers }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future." || error.message === 'Token refresh in progress') {
        return dispatch(refreshAuthToken(firebaseUserObj, createPost, clientId, recipientIds, contactPhoneNumbers, postId));
      }

      error = setErrorDescription(error, 'POST post failed');
      amplitude.logEvent('Posts - Forward Post', { is_successful: false, num_recipients: recipientIds.length, error_description: error.description, error_message: error.message });
      throw error;
    });
};

// Delete post to API from PostListItem. Call removePost from component. Does not delete AWS media in case of reshares.
export const deletePost = (authToken, firebaseUserObj, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/posts/' + postId)
    .then((delPost) => {
      amplitude.logEvent('Posts - Delete Post', { is_successful: true, body: delPost.body });

      return delPost;
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future." || error.message === 'Token refresh in progress') {
        return dispatch(refreshAuthToken(firebaseUserObj, deletePost, postId));
      }

      error = setErrorDescription(error, 'DEL post failed');
      amplitude.logEvent('Posts - Delete Post', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};
