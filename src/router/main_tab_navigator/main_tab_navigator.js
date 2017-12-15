// Library Imports
import React                from 'react';
import { TabNavigator }     from 'react-navigation';
import Icon                 from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import HomeScreenContainer                   from '../../components/home_screen/home_screen_container.js';
import { UserTabNavigator }                  from './user_tab_navigator/user_tab_navigator.js';
import { styles }                            from './main_tab_navigator_styles.js';
import { toHomeScreen, toAuthoredPostsTab }  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

export const MainTabNavigator = TabNavigator({
  HomeScreen: {
    screen: HomeScreenContainer,
    navigationOptions:  ({navigation}) => ({
      tabBarIcon:       ({ focused, tintColor }) => <Icon name='home' style={[styles.icon, focused && styles.iconFocused]} /> ,
      tabBarOnPress:    (scene) => {if(!scene.focused) {navigation.dispatch(toHomeScreen(Date()))}}
    })
  },
  UserTabNavigator: {
    screen: UserTabNavigator,
    navigationOptions:  ({navigation}) => ({
      tabBarIcon:       ({ focused, tintColor }) => <Icon name='user' style={[styles.icon, focused && styles.iconFocused]} />,
      tabBarOnPress:    (scene) => {if(!scene.focused) {navigation.dispatch(toAuthoredPostsTab(Date()))}}
    })
  },
}, {
  tabBarPosition:   'bottom',
  swipeEnabled:     false,
  animationEnabled: false,
  lazy:             true,
  tabBarOptions: {
    showLabel:      false,
    showIcon:       true,
    style:          styles.style,
    indicatorStyle: { backgroundColor: 'transparent' },
  }
});
