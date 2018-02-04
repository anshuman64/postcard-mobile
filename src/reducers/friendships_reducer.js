// Library Imports
import _ from 'lodash';

// Local Imports
import { FRIENDSHIP_ACTION_TYPES }  from '../actions/friendship_actions.js';

//--------------------------------------------------------------------//


const DEFAULT_STATE = {};

const FriendshipsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case FRIENDSHIP_ACTION_TYPES.GET:
      // newState.currentScreen = Actions.currentScene.replace(/^_/, '');

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default FriendshipsReducer;
