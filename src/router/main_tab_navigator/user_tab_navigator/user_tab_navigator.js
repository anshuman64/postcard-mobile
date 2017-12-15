// Library Imports
import React             from 'react';
import { TabNavigator }  from 'react-navigation';

// Local Imports
import AuthoredPostsTabContainer                from '../../../components/user_screen/authored_posts_tab_container.js';
import LikedPostsTabContainer                   from '../../../components/user_screen/liked_posts_tab_container.js';
import { styles }                               from './user_tab_navigator_styles.js';
import { COLORS }                               from '../../../utilities/style_utility.js';
import { toAuthoredPostsTab, toLikedPostsTab }  from '../../../actions/navigation_actions.js';
import { getCurrentRoute }  from '../../../utilities/function_utility.js';


//--------------------------------------------------------------------//

export const UserTabNavigator = TabNavigator({
  AuthoredPostsTab: {
    screen: AuthoredPostsTabContainer,
    navigationOptions:  ({navigation}) => ({
      tabBarLabel:      'Posts',
      tabBarOnPress:    (scene) => {if(!scene.focused) {navigation.dispatch(toAuthoredPostsTab(getCurrentRoute(navigation.state)))}}
    })
  },
  LikedPostsTab: {
    screen: LikedPostsTabContainer,
    navigationOptions:  ({navigation}) => ({
      tabBarLabel:      'Likes',
      tabBarOnPress:    (scene) => {if(!scene.focused) {navigation.dispatch(toLikedPostsTab(getCurrentRoute(navigation.state)))}}
    })
  },
}, {
  lazy: true,
  tabBarOptions: {
    indicatorStyle:     styles.indicatorStyle,
    labelStyle:         styles.labelStyle,
    style:              styles.style,
    activeTintColor:    COLORS.appleBlue,
    inactiveTintColor:  COLORS.grey900
  }
});
