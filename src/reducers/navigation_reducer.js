// Library Imports
import * as _                                                                                   from 'lodash';
import { NavigationActions }                                                                    from 'react-navigation';

// Local Imports
import { AppNavigator }                                                                         from '../utilities/app_navigator.js';
import { TO_LOGIN_SCREEN, TO_CODE_AUTH_SCREEN, TO_POSTS_SCREEN, TO_NEW_POST_SCREEN, BACK_SCREEN } from '../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const DEFAULT_STATE = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('ConfirmCodeScreen')); // Changed from LoginScreen to ConfirmCodeScreen for debugging

const NavigationReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case TO_LOGIN_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LoginScreen' }),
        state
      );

      return newState;
    case TO_CODE_AUTH_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ConfirmCodeScreen' }),
        state
      );

      return newState;
    case TO_POSTS_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'PostsScreen' }),
        state
      );

      return newState;
    case TO_NEW_POST_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'NewPostScreen' }),
        state
      );

      return newState;
    case BACK_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default NavigationReducer;
