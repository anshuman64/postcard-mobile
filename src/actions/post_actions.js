// Library Imports
import _ from 'lodash';

// Local Imports
import { getImages }              from './image_actions';
import { amplitude }              from '../utilities/analytics_utility';
import * as APIUtility            from '../utilities/api_utility';
import { setErrorDescription }    from '../utilities/error_utility';
import { deleteFile, uploadFile } from '../utilities/file_utility';
import { refreshAuthToken }       from './client_actions';

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
  RECEIVE_POSTS:               'RECEIVE_POSTS',
  REFRESH_POSTS:               'REFRESH_POSTS',
  RECEIVE_POST:                'RECEIVE_POST',
  REMOVE_POST:                 'REMOVE_POST',
  PUSHER_RECEIVE_POST:         'PUSHER_RECEIVE_POST',
  RECEIVE_POSTS_FROM_MESSAGES: 'RECEIVE_POSTS_FROM_MESSAGES',
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

// posts (array): array of post objects
export const receivePostsFromMessages = (data) => {
  return { type: POST_ACTION_TYPES.RECEIVE_POSTS_FROM_MESSAGES, data: data };
}

//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//

// Returns API path for particular POST_TYPES
let getRouteForPostType = (postType, userId, isClient) => {
  switch(postType) {
    case POST_TYPES.RECEIVED:
      return '/received/';
    case POST_TYPES.PUBLIC:
      return '';
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
    case POST_TYPES.FOLLOWED:
      return '/followed';
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

      dispatch(getImages(posts));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getPosts, isRefresh, userId, postType, isClient, queryParams));
      }

      throw setErrorDescription(error, 'GET posts failed');
    });
};

// Create post to API from Header of NewPostScreen
export const createPost = (authToken, firebaseUserObj, clientId, isPublic, recipientIds, contactPhoneNumbers, postBody, postImagePath, postImageType, placeholderText) => (dispatch) => {
  let recipient_ids = [];
  let group_ids = [];

  _.forEach(recipientIds, (recipientId) => {
    if (recipientId > 0) {
      recipient_ids.push(recipientId);
    } else {
      group_ids.push(-1 * recipientId);
    }
  });

  let postPost = (imageKey) => {
    return APIUtility.post(authToken, '/posts', { body: postBody, image_url: imageKey, is_public: isPublic, recipient_ids: recipient_ids, contact_phone_numbers: contactPhoneNumbers, group_ids: group_ids })
      .then((newPost) => {
        amplitude.logEvent('Engagement - Create Post', { is_successful: true, body: postBody, image: imageKey ? true : false, is_public: isPublic, num_recipients: recipientIds.length, num_contact_recipients: contactPhoneNumbers.length, placeholder_text: placeholderText });
        dispatch(receivePost({ post: newPost, clientId: clientId, recipientIds: recipientIds, contactPhoneNumbers: contactPhoneNumbers }));
        dispatch(getImages(newPost));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshAuthToken(firebaseUserObj, createPost, clientId, isPublic, recipientIds, contactPhoneNumbers, postBody, postImagePath, postImageType, placeholderText));
        }

        postPostError(error);
      });
  }

  let postPostError = (error) => {
    error = setErrorDescription(error, 'POST post failed');
    amplitude.logEvent('Engagement - Create Post', { is_successful: false, body: postBody, image: postImagePath ? true : false, placeholder_text: placeholderText, is_public: isPublic, num_recipients: recipientIds.length, error_description: error.description, error_message: error.message });
    throw error;
  }

  if (postImagePath) {
    return dispatch(uploadFile(authToken, firebaseUserObj, postImagePath, postImageType, clientId, 'posts/'))
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

// Delete post to API from PostListItem. Call removePost from component.
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

// Adds posts from messages and user peek messages to posts cache
export const getPostsFromMessages = (object) => (dispatch) => {
  let posts = [];

  _.forEach(object, (obj) => {
    // If object is an array of messages
    if (obj.post) {
      posts.push(obj.post);
    }

    // If object is an array of users
    if (obj.peek_message && obj.peek_message.post) {
      posts.push(obj.peek_message.post);
    }
  });

  dispatch(receivePostsFromMessages({ posts: posts }));
}
