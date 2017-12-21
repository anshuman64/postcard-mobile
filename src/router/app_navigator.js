// Library Imports
import React               from 'react';
import RN                  from 'react-native';
import { StackNavigator }  from 'react-navigation';

// Local Imports
import DebugLoginScreenContainer  from '../components/debug_login_screen/debug_login_screen_container.js';
import LoadingScreenContainer     from '../components/loading_screen/loading_screen_container.js';
import LoginScreenContainer       from '../components/login_screen/login_screen_container.js';
import ConfirmCodeScreenContainer from '../components/confirm_code_screen/confirm_code_screen_container.js';
import { MainTabNavigator }       from './main_tab_navigator/main_tab_navigator.js';
import NewPostScreen              from '../components/new_post_screen/new_post_screen.js';
import MenuScreen                 from '../components/menu_screen/menu_screen.js';


//--------------------------------------------------------------------//


export const AppNavigator = StackNavigator({
  LoadingScreen: { screen: LoadingScreenContainer },
  // DebugLoginScreen: { screen: DebugLoginScreenContainer },
  // LoginScreen: { screen: LoginScreenContainer },
  // ConfirmCodeScreen: { screen: ConfirmCodeScreenContainer },
  MainTabNavigator: { screen: MainTabNavigator },
  NewPostScreen: { screen: NewPostScreen },
  MenuScreen: { screen: MenuScreen }
}, {
  navigationOptions: {
    gesturesEnabled: false
  }
});


//--------------------------------------------------------------------//
