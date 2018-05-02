// Library Imports
import _ from 'lodash';

// Local Imports
import { MESSAGE_ACTION_TYPES }    from '../actions/message_actions';
import { FRIENDSHIP_ACTION_TYPES } from '../actions/friendship_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  userId1: [{
    id:            30,
    body:          hello world!,
    author_id:     1,
    friendship_id: 0,
    post_id:       30,
    created_at:    2018-01-18T23:48:06.000Z,
    updated_at:    2018-01-18T23:48:06.000Z,
    medium:        {mediumObj}
    post:          {postObj}
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
      convoId = action.data.convoId;

      newState[convoId]       = newState[convoId]       || {};
      newState[convoId].data  = newState[convoId].data  || [];
      newState[convoId].isEnd = newState[convoId].isEnd || false;

      if (!action.data.isNew && action.data.messages.length < 20) {
        newState[convoId].isEnd = true;
      }

      if (action.data.isNew) {
        newState[convoId].data = action.data.messages.concat(newState[convoId].data);
      } else {
        newState[convoId].data = newState[convoId].data.concat(action.data.messages);
      }

      return newState;
    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
      convoId = action.data.convoId;

      newState[convoId]       = newState[convoId]       || {};
      newState[convoId].data  = newState[convoId].data  || [];
      newState[convoId].isEnd = newState[convoId].isEnd || false;

      newState[convoId].data.unshift(action.data.message);

      return newState;

    //--------------------------------------------------------------------//
    // Friendship Actions
    //--------------------------------------------------------------------//

    // Since we don't know if user is requester or requestee, delete messages for both
    case FRIENDSHIP_ACTION_TYPES.REMOVE_FRIENDSHIP:
      let removeMessages = (id) => {
        newState[id]       = {};
        newState[id].data  = [];
        newState[id].isEnd = false;
      }

      removeMessages(action.data.friendship.requester_id);
      removeMessages(action.data.friendship.requestee_id);

      return newState;

    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default MessagesReducer;
