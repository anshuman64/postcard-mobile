// Library Imports
import _ from 'lodash';

// Local Imports
import { MESSAGE_ACTION_TYPES }    from '../actions/message_actions';
import { FRIENDSHIP_ACTION_TYPES } from '../actions/friendship_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  userId1: [{
    "id":            30,
    "body":          "hello world!",
    "author_id":     1,
    "image_url":     "1/posts/054b24a0-fcaa-11e7-aad3-a1f5d5b8af51.jpeg",
    "friendship_id": 0,
    "created_at":    "2018-01-18T23:48:06.000Z",
    "updated_at":    "2018-01-18T23:48:06.000Z",
  }, {
    ...another message object
  }]
  userId2: {...
*/

const DEFAULT_STATE = {};

const MessagesReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Message Actions
    //--------------------------------------------------------------------//

    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGES:
      userId = action.data.userId;

      newState[userId]       = newState[userId]       || {};
      newState[userId].data  = newState[userId].data  || [];
      newState[userId].isEnd = newState[userId].isEnd || false;

      if (!action.data.isNew && action.data.messages.length < 20) {
        newState[userId].isEnd = true;
      }

      if (action.data.isNew) {
        newState[userId].data = action.data.messages.concat(newState[userId].data);
      } else {
        newState[userId].data = newState[userId].data.concat(action.data.messages);
      }

      return newState;
    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
      userId = action.data.userId;

      newState[userId]       = newState[userId]       || {};
      newState[userId].data  = newState[userId].data  || [];
      newState[userId].isEnd = newState[userId].isEnd || false;

      newState[userId].data.unshift(action.data.message);

      return newState;
    case MESSAGE_ACTION_TYPES.PUSHER_RECEIVE_MESSAGE:
      userId = action.data.client.id;

      newState[userId]       = newState[userId]       || {};
      newState[userId].data  = newState[userId].data  || [];
      newState[userId].isEnd = newState[userId].isEnd || false;

      newState[userId].data.unshift(action.data.message);

      return newState;

    //--------------------------------------------------------------------//
    // Friendship Actions
    //--------------------------------------------------------------------//

    case FRIENDSHIP_ACTION_TYPES.REMOVE_FRIENDSHIP:
    case FRIENDSHIP_ACTION_TYPES.PUSHER_DESTROY_FRIENDSHIP:
      userId = action.data.client.id;

      newState[userId]       = {};
      newState[userId].data  = [];
      newState[userId].isEnd = false;

      return newState;

    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default MessagesReducer;
