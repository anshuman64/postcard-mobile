// Library Imports
import React             from 'react';
import { TabNavigator }  from 'react-navigation';

// Local Imports
import AuthoredPostsTab               from '../components/user_screen/authored_posts_tab.js';
import LikedPostsTab                  from '../components/user_screen/liked_posts_tab.js';
import { styles }                     from './user_tab_navigator_styles.js';
import * as NavigationActionCreators  from '../actions/navigation_actions.js';


//--------------------------------------------------------------------//

export const UserTabNavigator = TabNavigator({
  AuthoredPostsTab: {
    screen: AuthoredPostsTab,
    navigationOptions:  ({navigation}) => ({
      tabBarLabel:      'Posts',
      tabBarOnPress:    (scene) => {if(!scene.focused) {navigation.dispatch(NavigationActionCreators.toAuthoredPostsTab())}}
    })
  },
  LikedPostsTab: {
    screen: LikedPostsTab,
    navigationOptions:  ({navigation}) => ({
      tabBarLabel:      'Likes',
      tabBarOnPress:    (scene) => {if(!scene.focused) {navigation.dispatch(NavigationActionCreators.toLikedPostsTab())}}
    })
  },
}, {
  tabBarOptions: {
    indicatorStyle:     styles.indicatorStyle,
    labelStyle:         styles.labelStyle,
    style:              styles.style,
    activeTintColor:    '#007aff',
    inactiveTintColor:  '#212121'
  }
});