// Library Imports
import * as _                 from 'lodash';
import { NavigationActions }  from 'react-navigation';

// Local Imports
import { AppNavigator }             from '../router/app_navigator.js';
import { NAVIGATION_ACTION_TYPES }  from '../actions/navigation_actions.js';

//--------------------------------------------------------------------//


const DEFAULT_STATE = _.merge(AppNavigator.router.getStateForAction(NavigationActions.init()), {isHomeScreenFocused: false, isUserScreenFocused: false});

const NavigationReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case NAVIGATION_ACTION_TYPES.TO_LOADING_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LoadingScreen' }),
        state
      );

      return newState;
    case NAVIGATION_ACTION_TYPES.TO_LOGIN_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LoginScreen' }),
        state
      );

      return newState;
    case NAVIGATION_ACTION_TYPES.TO_CONFIRM_CODE_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ConfirmCodeScreen' }),
        state
      );

      return newState;
    case NAVIGATION_ACTION_TYPES.TO_HOME_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'HomeScreen' }),
        state
      );

      if (action.data) {
        newState.homeScreenDate = action.data;
      }

      return newState;
    case NAVIGATION_ACTION_TYPES.TO_AUTHORED_POSTS_TAB:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'AuthoredPostsTab' }),
        state
      );

      if (action.data) {
        newState.userScreenDate = action.data;
      }

      return newState;
    case NAVIGATION_ACTION_TYPES.TO_LIKED_POSTS_TAB:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LikedPostsTab' }),
        state
      );

      return newState;
    case NAVIGATION_ACTION_TYPES.TO_NEW_POST_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'NewPostScreen' }),
        state
      );

      return newState;
    case NAVIGATION_ACTION_TYPES.TO_MENU_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MenuScreen' }),
        state
      );

      return newState;
    case NAVIGATION_ACTION_TYPES.GO_BACK:
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
