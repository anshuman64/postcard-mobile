// Local Imports
import { amplitude }                                  from '../utilities/analytics_utility';
import * as APIUtility                                from '../utilities/api_utility';
import { setErrorDescription, refreshCredsAndResume } from '../utilities/error_utility';
import { FRIEND_TYPES }                               from './friendship_actions';
import { uploadFile }                                 from '../utilities/file_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const MESSAGE_ACTION_TYPES = {
  RECEIVE_CONVERSATIONS:      'RECEIVE_CONVERSATIONS',
  RECEIVE_MESSAGES:           'RECEIVE_MESSAGES',
  RECEIVE_MESSAGE:            'RECEIVE_MESSAGE',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// friends (array): array of users with accepted friendships
// groups (array): array of groups
export const receiveConversations = (data) => {
  return { type: MESSAGE_ACTION_TYPES.RECEIVE_CONVERSATIONS, data: data };
};

// messages (array): array of messages in conversation with user
// convoId (int): id of group or user
// isNew (bool): bool if messsages are new messages or older ones
export const receiveMessages = (data) => {
  return { type: MESSAGE_ACTION_TYPES.RECEIVE_MESSAGES, data: data };
};

// convoId (int): id of group or user
// message (message object): message object of created message
export const receiveMessage = (data) => {
  return { type: MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

// TODO: refactor this so that it doesn't have to hit API twice for accepted friendships
export const getConversations = (authToken, firebaseUserObj) => (dispatch) => {
  let getConversationsError = (error) => {
    if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
      return dispatch(refreshCredsAndResume(firebaseUserObj, getConversations));
    }

    error = setErrorDescription(error, 'GET conversations failed');
    amplitude.logEvent('Messages - Get Conversations', { is_successful: false, error_description: error.description, error_message: error.message });
    throw error;
  }

  return APIUtility.get(authToken, '/friendships/' + FRIEND_TYPES.ACCEPTED)
    .then((friends) => {
      return APIUtility.get(authToken, '/groups')
        .then((groups) => {
          dispatch(receiveConversations({ friends: friends, groups: groups }));
        })
        .catch((error) => {
          getConversationsError(error);
        });
    })
    .catch((error) => {
      getConversationsError(error);
    });
}

export const getMessages = (authToken, firebaseUserObj, isNew, convoId, queryParams) => (dispatch) => {
  let isGroup = convoId > 0 ? false : true;
  let route = isGroup ? '/messages/group/' : '/messages/direct/';
  let idToSend = isGroup ? -1 * convoId : convoId;

  return APIUtility.get(authToken, route + idToSend, queryParams)
    .then((messages) => {
      dispatch(receiveMessages({ messages: messages, convoId: convoId, isNew: isNew }));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshCredsAndResume(firebaseUserObj, getMessages, isNew, convoId, queryParams));
      }

      error = setErrorDescription(error, 'GET messages failed');
      amplitude.logEvent('Messages - Get Messages', { is_successful: false, error_description: error.description, error_message: error.message });
      throw error;
    });
};

export const createMessage = (authToken, firebaseUserObj, clientId, convoId, messageBody, messageMedium, postId) => (dispatch) => {
  let postMessage = (updatedMedium) => {
    return APIUtility.post(authToken, '/' + route, { body: messageBody, medium: updatedMedium, recipient_id: idToSend, post_id: postId })
      .then((newMessage) => {
        amplitude.logEvent('Messages - Create Message', { is_successful: true, body: messageBody, media: messageMedium ? true : false, is_post: postId ? true : false, is_group: isGroup });
        dispatch(receiveMessage({ message: newMessage, convoId: convoId }));
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshCredsAndResume(firebaseUserObj, createMessage, clientId, convoId, messageBody, messageMedium, postId));
        }

        if (error.message === 'Post as message already exists') {
          return;
        }

        postMessageError(error);
      });
  }

  let postMessageError = (error) => {
    error = setErrorDescription(error, 'POST message failed');
    amplitude.logEvent('Messages - Create Message', { is_successful: false, body: messageBody, media: messageMedium ? true : false, error_description: error.description, error_message: error.message });
    throw error;
  }

  let isGroup = convoId > 0 ? false : true;
  let route = isGroup ? 'messages/group' : 'messages/direct';
  let idToSend = isGroup ? -1 * convoId : convoId;

  if (messageMedium) {
    return dispatch(uploadFile(authToken, firebaseUserObj, clientId, route + '/' + idToSend + '/', messageMedium))
      .then((updatedMedium) => {
        return postMessage(updatedMedium);
      })
      .catch((error) => {
        postMessageError(error);
      });
  } else {
    return postMessage();
  }
};
