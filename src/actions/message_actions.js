// Local Imports
import { amplitude }            from '../utilities/analytics_utility';
import * as APIUtility          from '../utilities/api_utility';
import { setErrorDescription }  from '../utilities/error_utility';
import { refreshAuthToken }     from './client_actions';
import { getImages }            from './image_actions';
import { getPostsFromMessages } from './post_actions';
import { uploadFile }           from '../utilities/file_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const MESSAGE_ACTION_TYPES = {
  RECEIVE_MESSAGES:           'RECEIVE_MESSAGES',
  RECEIVE_MESSAGE:            'RECEIVE_MESSAGE',
  PUSHER_RECEIVE_MESSAGE:     'PUSHER_RECEIVE_MESSAGE',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// messages (array): array of messages in conversation with user
// userId (int): user id of other user
// isNew (bool): bool if messsages are new messages or older ones
export const receiveMessages = (data) => {
  return { type: MESSAGE_ACTION_TYPES.RECEIVE_MESSAGES, data: data };
};

// userId (int): user id of other user
// message (message object): message object of created message
export const receiveMessage = (data) => {
  return { type: MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE, data: data };
};

// userId (int): user id of other user
// message (message object): message object
export const pusherReceiveMessage = (data) => {
  return { type: MESSAGE_ACTION_TYPES.PUSHER_RECEIVE_MESSAGE, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const getMessages = (authToken, firebaseUserObj, isNew, userId, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/messages/direct/' + userId, queryParams)
    .then((messages) => {
      dispatch(receiveMessages({ messages: messages, userId: userId, isNew: isNew }));
      dispatch(getImages(messages));
      dispatch(getPostsFromMessages(messages));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getMessages, isNew, userId, queryParams));
      }

      error = setErrorDescription(error, 'GET messages failed');
      throw error;
    });
};

export const createMessage = (authToken, firebaseUserObj, clientId, userId, messageBody, messageImagePath, messageImageType, postId) => (dispatch) => {
  let postMessage = (imageKey) => {
    return APIUtility.post(authToken, '/messages', { body: messageBody, image_url: imageKey, recipient_id: userId, post_id: postId })
      .then((newMessage) => {
        amplitude.logEvent('Engagement - Create Message', { is_successful: true, body: messageBody, image: imageKey ? true : false, is_post: postId ? true : false });

        // If message is a post, will be refreshed automatically
        if (!postId) {
          dispatch(receiveMessage({ message: newMessage, userId: userId }));
          dispatch(getImages(newMessage));
        }
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshAuthToken(firebaseUserObj, createMessage, userId, messageBody, messageImagePath, messageImageType));
        }

        if (error.message === 'Post as message already exists') {
          return;
        }

        postMessageError(error);
      });
  }

  let postMessageError = (error) => {
    error = setErrorDescription(error, 'POST message failed');
    amplitude.logEvent('Engagement - Create Message', { is_successful: false, body: messageBody, image: messageImagePath ? true : false, error_description: error.description, error_message: error.message });
    throw error;
  }

  if (messageImagePath) {
    return dispatch(uploadFile(authToken, firebaseUserObj, messageImagePath, messageImageType, clientId, 'messages/direct/' + userId + '/'))
      .then((data) => {
        return postMessage(data.key);
      })
      .catch((error) => {
        postMessageError(error);
      });
  } else {
    return postMessage();
  }
};
