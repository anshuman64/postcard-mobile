// Local Imports
import { amplitude }            from '../utilities/analytics_utility';
import * as APIUtility          from '../utilities/api_utility';
import { setErrorDescription }  from '../utilities/error_utility';
import { refreshAuthToken }     from './client_actions';
import { FRIEND_TYPES }         from './friendship_actions';
import { receiveGroups, getUsersFromGroups } from './group_actions';
import { getImages }            from './image_actions';
import { getPostsFromMessages } from './post_actions';
import { uploadFile }           from '../utilities/file_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const MESSAGE_ACTION_TYPES = {
  RECEIVE_CONVERSATIONS:      'RECEIVE_CONVERSATIONS',
  RECEIVE_MESSAGES:           'RECEIVE_MESSAGES',
  RECEIVE_MESSAGE:            'RECEIVE_MESSAGE',
  PUSHER_RECEIVE_MESSAGE:     'PUSHER_RECEIVE_MESSAGE',
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

// TODO: refactor this so that it doesn't have to hit API twice for accepted friendships
export const getConversations = (authToken, firebaseUserObj) => (dispatch) => {
  let getConversationsError = (error) => {
    if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
      return dispatch(refreshAuthToken(firebaseUserObj, getConversations));
    }

    throw setErrorDescription(error, 'GET conversations failed');
  }

  return APIUtility.get(authToken, '/friendships/' + FRIEND_TYPES.ACCEPTED)
    .then((friends) => {
      return APIUtility.get(authToken, '/groups')
        .then((groups) => {
          dispatch(receiveConversations({ friends: friends, groups: groups }));
          dispatch(receiveGroups({ groups: groups }));
          dispatch(getUsersFromGroups(groups));
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
      dispatch(getImages(messages));
      dispatch(getPostsFromMessages(messages));
    })
    .catch((error) => {
      if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
        return dispatch(refreshAuthToken(firebaseUserObj, getMessages, isNew, convoId, queryParams));
      }

      throw setErrorDescription(error, 'GET messages failed');
    });
};

export const createMessage = (authToken, firebaseUserObj, clientId, convoId, messageBody, messageImagePath, messageImageType, postId) => (dispatch) => {
  let postMessage = (imageKey) => {
    return APIUtility.post(authToken, route, { body: messageBody, image_url: imageKey, recipient_id: idToSend, post_id: postId })
      .then((newMessage) => {
        amplitude.logEvent('Engagement - Create Message', { is_successful: true, body: messageBody, image: imageKey ? true : false, is_post: postId ? true : false, isGroup: isGroup });

        // If message is a post, will be refreshed automatically
        if (!postId) {
          dispatch(receiveMessage({ message: newMessage, convoId: convoId }));
          dispatch(getImages(newMessage));
        }
      })
      .catch((error) => {
        if (error.message === "Invalid access token. 'Expiration time' (exp) must be in the future.") {
          return dispatch(refreshAuthToken(firebaseUserObj, createMessage, clientId, convoId, messageBody, messageImagePath, messageImageType, postId));
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

  let isGroup = convoId > 0 ? false : true;
  let route = isGroup ? '/messages/group' : '/messages/direct';
  let idToSend = isGroup ? -1 * convoId : convoId;

  if (messageImagePath) {
    return dispatch(uploadFile(authToken, firebaseUserObj, messageImagePath, messageImageType, clientId, route + '/' + idToSend + '/'))
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
