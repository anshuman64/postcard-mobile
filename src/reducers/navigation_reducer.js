// Library Imports
import * as _ from 'lodash';
import { NavigationActions } from 'react-navigation';

// Local Imports
import { AppNavigator } from '../utilities/app_navigator.js';
import { TO_LOGIN_SCREEN, TO_CODEAUTH_SCREEN, TO_POSTS_SCREEN, TO_NEWPOST_SCREEN, BACK_SCREEN } from '../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const DEFAULT_STATE = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('LoginScreen'));

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
    case TO_CODEAUTH_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'CodeAuthScreen' }),
        state
      );

      return newState;
    case TO_POSTS_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'PostsScreen' }),
        state
      );

      return newState;
    case TO_NEWPOST_SCREEN:
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
