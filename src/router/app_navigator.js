// Library Imports
import React                                                from 'react';
import RN                                                   from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions }  from 'react-navigation';
import Icon                                                 from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon                                              from 'react-native-vector-icons/Ionicons';

// Local Imports
import LoadingScreenContainer         from '../components/loading_screen/loading_screen_container.js';
import LoginScreenContainer           from '../components/login_screen/login_screen_container.js';
import ConfirmCodeScreenContainer     from '../components/confirm_code_screen/confirm_code_screen_container.js';
import { MainTabNavigator }           from './main_tab_navigator.js';
import NewPostScreenContainer         from '../components/new_post_screen/new_post_screen_container.js';
import MenuScreen                     from '../components/menu_screen/menu_screen.js';
import * as NavigationActionCreators  from '../actions/navigation_actions.js';
import { styles }                     from './app_navigator_styles.js';


//--------------------------------------------------------------------//


export const AppNavigator = StackNavigator({
  // LoadingScreen: {
  //   screen: LoadingScreenContainer,
  //   navigationOptions: {
  //     header: null,
  //   }
  // },
  LoginScreen: {
    screen: LoginScreenContainer,
    navigationOptions: {
      header: null,
    }
  },
  ConfirmCodeScreen: {
    screen: ConfirmCodeScreenContainer,
    navigationOptions: ({navigation}) => ({
      headerLeft: <Ionicon name='ios-arrow-round-back' onPress={() => navigation.dispatch(NavigationActionCreators.goBack())} style={styles.backIcon}/>
    }),
  },
  MainTabNavigator: {
    screen: MainTabNavigator,
    navigationOptions: ({navigation}) => ({
      headerTitle: <RN.Image
        style={styles.headerTitle}
        source={require('../assets/images/login_screen_logo/Logo_ExactFit_807x285.png')}
        resizeMode='contain'
      />,
      headerRight: <Icon name='options-vertical' onPress={() => navigation.dispatch(NavigationActionCreators.toMenuScreen())} style={styles.optionsIcon} />,
      headerLeft:  <Icon name='note' onPress={() => navigation.dispatch(NavigationActionCreators.toNewPostScreen())} style={styles.noteIcon} />,
    })
   },
  NewPostScreen: {
   screen: NewPostScreenContainer,
   navigationOptions: ({navigation}) => ({
     headerRight:  <RN.Text style={styles.shareButtonText}>Share</RN.Text>,
     headerLeft:   <Ionicon name='ios-arrow-round-back' onPress={() => navigation.dispatch(NavigationActionCreators.goBack())} style={styles.backIcon}/>
   }),
  },
  MenuScreen: {
   screen: MenuScreen,
   navigationOptions: ({navigation}) => ({
     headerLeft: <Ionicon name='ios-arrow-round-back' onPress={() => navigation.dispatch(NavigationActionCreators.goBack())} style={styles.backIcon}/>
   }),
  }
});


//--------------------------------------------------------------------//
