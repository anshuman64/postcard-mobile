// Library Imports
import * as _                 from 'lodash';
import { NavigationActions }  from 'react-navigation';

// Local Imports
import { AppNavigator, PostNavigator }                                                                                                                 from '../utilities/app_navigator.js';
import { TO_LOGIN_SCREEN, TO_CONFIRM_CODE_SCREEN, TO_HOME_SCREEN, TO_MY_POSTS_TAB, TO_MY_LIKES_TAB, TO_MENU_SCREEN, TO_NEW_POST_SCREEN, BACK_SCREEN }  from '../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const DEFAULT_STATE = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('HomeScreen'));

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
    case TO_CONFIRM_CODE_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ConfirmCodeScreen' }),
        state
      );

      return newState;
    case TO_HOME_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'HomeScreen' }),
        state
      );

      return newState;
    case TO_MY_POSTS_TAB:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MyPostsTab' }),
        state
      );

      return newState;
    case TO_MY_LIKES_TAB:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MyLikesTab' }),
        state
      );

      return newState;
    case TO_NEW_POST_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'NewPostScreen' }),
        state
      );

      return newState;
    case TO_MENU_SCREEN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MenuScreen' }),
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
