// Library Imports
import * as _                 from 'lodash';
import { NavigationActions }  from 'react-navigation';

// Local Imports
import { AppNavigator }                from '../router/app_navigator.js';
import * as NavigationActionConstants  from '../actions/navigation_actions.js';

//--------------------------------------------------------------------//


const DEFAULT_STATE = AppNavigator.router.getStateForAction(NavigationActions.init());

const NavigationReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    // Login Navigator
    case NavigationActionConstants.TO_LOGIN_NAVIGATOR:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LoginNavigator' }),
        state
      );

      return newState;
    case NavigationActionConstants.TO_LOGIN_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LoginScreen' }),
        state
      );

      return newState;
    case NavigationActionConstants.TO_CONFIRM_CODE_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ConfirmCodeScreen' }),
        state
      );

      return newState;

    // Main Navigator
    case NavigationActionConstants.TO_MAIN_NAVIGATOR:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MainNavigator' }),
        state
      );

      return newState;
    case NavigationActionConstants.TO_HOME_STACK_NAVIGATOR:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'HomeStackNavigator' }),
        state
      );

      return newState;
    case NavigationActionConstants.TO_USER_STACK_NAVIGATOR:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'UserStackNavigator' }),
        state
      );

      return newState;

    // Home StackNavigator
    case NavigationActionConstants.TO_HOME_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'HomeScreen' }),
        state
      );

      return newState;
    case NavigationActionConstants.TO_NEW_POST_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'NewPostScreen' }),
        state
      );

      return newState;

    // User StackNavigator
    case NavigationActionConstants.TO_MY_POSTS_TAB:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MyPostsTab' }),
        state
      );

      return newState;
    case NavigationActionConstants.TO_MY_LIKES_TAB:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MyLikesTab' }),
        state
      );

      return newState;

    // Common
    case NavigationActionConstants.TO_MENU_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MenuScreen' }),
        state
      );

      return newState;
    case NavigationActionConstants.BACK_SCREEN:
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
