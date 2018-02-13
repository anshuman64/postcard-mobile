// Local Imports
import { amplitude }           from '../utilities/analytics_utility.js';
import * as APIUtility         from '../utilities/api_utility.js';
import { setErrorDescription } from '../utilities/error_utility.js';
import { refreshAuthToken }    from './client_actions.js';
import { getImages }           from './image_actions.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const MESSAGE_ACTION_TYPES = {
  RECEIVE_MESSAGES:       'RECEIVE_MESSAGES',
  RECEIVE_MESSAGE:        'RECEIVE_MESSAGE',
  PUSHER_RECEIVE_MESSAGE: 'PUSHER_RECEIVE_MESSAGE',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveMessages = (data) => {
  return { type: MESSAGE_ACTION_TYPES.RECEIVE_MESSAGES, data: data };
};

export const receiveMessage = (data) => {
  return { type: MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE, data: data };
};

export const pusherReceiveMessage = (data) => {
  return { type: MESSAGE_ACTION_TYPES.PUSHER_RECEIVE_MESSAGE, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const getMessages = (authToken, firebaseUserObj, userId, queryParams) => (dispatch) => {
  return APIUtility.get(authToken, '/messages/direct/' + userId, queryParams)
    .then((messages) => {
      dispatch(receiveMessages({ messages: messages, userId: userId }));
      dispatch(getImages(messages));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getMessages, userId, queryParams));
      }

      error = setErrorDescription(error, 'GET messages failed');
      throw error;
    });
};

export const createMessage = (authToken, firebaseUserObj, clientId, userId, messageBody, messageImagePath, messageImageType) => (dispatch) => {
  let postMessage = (imageKey) => {
    return APIUtility.post(authToken, '/messages', { body: messageBody, image_url: imageKey, recipient_id: userId })
      .then((newMessage) => {
        amplitude.logEvent('Engagement - Create Message', { is_successful: true, body: messageBody, image: imageKey ? true : false });
        dispatch(receiveMessage({ message: newMessage, userId: userId }));
        dispatch(getImages(newMessage));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshAuthToken(firebaseUserObj, createMessage, userId, messageBody, messageImagePath, messageImageType));
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
