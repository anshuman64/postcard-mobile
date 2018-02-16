// Library Imports
import _  from 'lodash';

// Local Imports
import { BLOCK_ACTION_TYPES } from '../actions/block_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  blockedUsers: [],
};

const BlocksReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case BLOCK_ACTION_TYPES.RECEIVE_BLOCKED_USERS:
      newState.blockedUsers = [];

      _.forEach(action.data.blockedUsers, (user) => {
        newState.blockedUsers.push(user.id);
      })

      return newState;
    case BLOCK_ACTION_TYPES.RECEIVE_BLOCK:
      newState.blockedUsers.push(action.data.block.blockee_id);

      return newState;
    case BLOCK_ACTION_TYPES.REMOVE_BLOCK:
      _.remove(newState.blockedUsers, (blockedUserIds) => {
        return blockedUserIds === action.data.block.blockee_id;
      });

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default BlocksReducer;
