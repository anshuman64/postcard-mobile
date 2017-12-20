// Library Imports
import React                                                from 'react';
import RN                                                   from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions }  from 'react-navigation';
import Icon                                                 from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import DebugLoginScreenContainer          from '../components/debug_login_screen/debug_login_screen_container.js';
import LoadingScreenContainer             from '../components/loading_screen/loading_screen_container.js';
import LoginScreenContainer               from '../components/login_screen/login_screen_container.js';
import ConfirmCodeScreenContainer         from '../components/confirm_code_screen/confirm_code_screen_container.js';
import { MainTabNavigator }               from './main_tab_navigator/main_tab_navigator.js';
import NewPostScreenContainer             from '../components/new_post_screen/new_post_screen_container.js';
import MenuScreen                         from '../components/menu_screen/menu_screen.js';
import { toMenuScreen, toNewPostScreen }  from '../actions/navigation_actions.js';
import { styles }                         from './app_navigator_styles.js';


//--------------------------------------------------------------------//


export const AppNavigator = StackNavigator({
  // LoadingScreen: { screen: LoadingScreenContainer },
  // DebugLoginScreen: { screen: DebugLoginScreenContainer },
  LoginScreen: { screen: LoginScreenContainer },
  // ConfirmCodeScreen: { screen: ConfirmCodeScreenContainer },
  MainTabNavigator: { screen: MainTabNavigator },
  NewPostScreen: { screen: NewPostScreenContainer },
  MenuScreen: { screen: MenuScreen }
});


//--------------------------------------------------------------------//
