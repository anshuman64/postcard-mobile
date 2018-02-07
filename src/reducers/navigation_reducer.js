// Library Imports
import _                        from 'lodash';
import { Actions, ActionConst } from 'react-native-router-flux';

// Local Imports
import { NAVIGATION_ACTION_TYPES }  from '../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  currentScreen: null
};

const NavigationReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    // When a screen is focused, update currentScreen. Remove the leading '_'s from the string.
    case ActionConst.FOCUS:
      newState.currentScreen = Actions.currentScene.replace(/^_/, '');

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default NavigationReducer;
