// Library Imports
import * as _                 from 'lodash';
import { Actions } from 'react-native-router-flux';

// Local Imports
// import { AppNavigator }             from '../router/app_navigator.js';
import { NAVIGATION_ACTION_TYPES }  from '../actions/navigation_actions.js';

//--------------------------------------------------------------------//


const DEFAULT_STATE = {};

const NavigationReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case NAVIGATION_ACTION_TYPES.TO_CONFIRM_CODE_SCREEN:
      newState = Actions.state;
      debugger

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default NavigationReducer;
