// Library Imports
import React                                                                      from 'react';
import RN                                                                         from 'react-native';
import { connect }                                                                from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator, NavigationActions }  from 'react-navigation';
import Icon                                                                       from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon                                                                    from 'react-native-vector-icons/Ionicons';

// Local Imports
import LoadingScreenContainer                                                     from '../components/loading_screen/loading_screen_container.js';
import LoginScreenContainer                                                       from '../components/login_screen/login_screen_container.js';
import ConfirmCodeScreenContainer                                                 from '../components/confirm_code_screen/confirm_code_screen_container.js';
import HomeScreenContainer                                                        from '../components/home_screen/home_screen_container.js';
import AuthoredPostsTab                                                                 from '../components/user_screen/authored_posts_tab.js';
import LikedPostsTab                                                                 from '../components/user_screen/liked_posts_tab.js';
import NewPostScreenContainer                                                     from '../components/new_post_screen/new_post_screen_container.js';
import MenuScreen                                                                 from '../components/menu_screen/menu_screen.js';
import * as NavigationActionCreators                                              from '../actions/navigation_actions.js';
import { userTabNavigatorStyles, homeStackNavigatorStyles, mainNavigatorStyles }  from './app_navigator_styles.js';


//--------------------------------------------------------------------//

// TODO: Organize all navigators into separate files
export const UserTabNavigator = TabNavigator({
  AuthoredPostsTab: {
    screen: AuthoredPostsTab,
    navigationOptions: ({navigation}) => ({
      tabBarLabel:    'Posts',
      tabBarOnPress:  (scene) => {if(!scene.focused) {navigation.dispatch(NavigationActionCreators.toMyPostsTab())}}
    })
  },
  LikedPostsTab: {
    screen: LikedPostsTab,
    navigationOptions: ({navigation}) => ({
      tabBarLabel:    'Likes',
      tabBarOnPress:  (scene) => {if(!scene.focused) {navigation.dispatch(NavigationActionCreators.toMyLikesTab())}}
    })
  },
}, {
  tabBarOptions: {
    indicatorStyle:     userTabNavigatorStyles.indicatorStyle,
    labelStyle:         userTabNavigatorStyles.labelStyle,
    style:              userTabNavigatorStyles.style,
    activeTintColor:    '#007aff',
    inactiveTintColor:  '#212121'
  }
});

const UserStackNavigator = StackNavigator({
  UserTabNavigator: {
    screen: UserTabNavigator,
    navigationOptions: ({navigation}) => ({
      headerTitle: <RN.Image
        style={homeStackNavigatorStyles.headerTitle}
        source={require('../assets/images/login_screen_logo/Logo_ExactFit_807x285.png')}
        resizeMode='contain'
      />,
      headerRight:  <Icon name='options-vertical' onPress={() => navigation.dispatch(NavigationActionCreators.toMenuScreen())} style={homeStackNavigatorStyles.optionsIcon} />,
      headerLeft:   <Icon name='note' onPress={() => navigation.dispatch(NavigationActionCreators.toNewPostScreen())} style={homeStackNavigatorStyles.noteIcon} />,
      headerStyle:  {elevation: 0}
    })
  },
  NewPostScreen: { screen: NewPostScreenContainer },
});

const HomeStackNavigator = StackNavigator({
  HomeScreen: {
    screen: HomeScreenContainer,
    navigationOptions: ({navigation}) => ({
      headerTitle: <RN.Image
        style={homeStackNavigatorStyles.headerTitle}
        source={require('../assets/images/login_screen_logo/Logo_ExactFit_807x285.png')}
        resizeMode='contain'
      />,
      headerRight: <Icon name='options-vertical' onPress={() => navigation.dispatch(NavigationActionCreators.toMenuScreen())} style={homeStackNavigatorStyles.optionsIcon} />,
      headerLeft: <Icon name='note' onPress={() => navigation.dispatch(NavigationActionCreators.toNewPostScreen())} style={homeStackNavigatorStyles.noteIcon} />,
    })
   },
  NewPostScreen: {
    screen: NewPostScreenContainer,
    navigationOptions: ({navigation}) => ({
      headerRight:  <RN.Text style={homeStackNavigatorStyles.shareButtonText}>Share</RN.Text>,
      headerLeft:   <Ionicon name='ios-arrow-round-back' onPress={() => navigation.dispatch(NavigationActionCreators.goBack())} style={homeStackNavigatorStyles.backIcon}/>
    }),
  },
  MenuScreen: {
    screen: MenuScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: <Ionicon name='ios-arrow-round-back' onPress={() => navigation.dispatch(NavigationActionCreators.goBack())} style={homeStackNavigatorStyles.backIcon}/>
    }),
  }
});


const MainNavigator = TabNavigator({
  HomeStackNavigator: {
    screen: HomeStackNavigator,
    navigationOptions: ({navigation}) => ({
      tabBarIcon:     ({ focused, tintColor }) => <Icon name='home' style={[mainNavigatorStyles.iconStyle, focused && mainNavigatorStyles.iconFocused]} /> ,
      tabBarOnPress:  (scene) => {if(!scene.focused) {navigation.dispatch(NavigationActionCreators.toHomeStackNavigator())}}
    })
  },
  UserStackNavigator: {
    screen: UserStackNavigator,
    navigationOptions: ({navigation}) => ({
      tabBarIcon:     ({ focused, tintColor }) => <Icon name='user' style={[mainNavigatorStyles.iconStyle, focused && mainNavigatorStyles.iconFocused]} />,
      tabBarOnPress:  (scene) => {if(!scene.focused) {navigation.dispatch(NavigationActionCreators.toUserStackNavigator())}}
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
    style:          mainNavigatorStyles.style,
    indicatorStyle: {backgroundColor: 'transparent'},
  }
});

// TODO: Move login nav into the app level nav
const LoginNavigator = StackNavigator({
 //  LoadingScreen: {
 //    screen: LoadingScreenContainer,
 //    navigationOptions: {
 //      header: null,
 //    }
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
      headerLeft: <Ionicon name='ios-arrow-round-back' onPress={() => navigation.dispatch(NavigationActionCreators.goBack())} style={homeStackNavigatorStyles.backIcon}/>
    }),
  },
});

export const AppNavigator = StackNavigator({
  // LoginNavigator: { screen: LoginNavigator }, // Debug Test: comment line to start app at HomeScreen
  MainNavigator: { screen: MainNavigator }
}, {
  headerMode: 'none'
});


//--------------------------------------------------------------------//


class AppWithNavigationState extends React.Component {
  componentDidMount() {
    RN.BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    RN.BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  // TODO: Fix this
  onBackPress = () => {
    // Exit app if on LoginScreen or on HomeScreen
    if ((this.props.nav.routes[0].routes.length === 1) || (this.props.nav.routes.length === 2 && this.props.nav.routes[1].routes[0].routes.length === 1)) {
      return false;
    }

    this.props.dispatch(NavigationActionCreators.goBack());
    return true;
  };

  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state:    this.props.nav
    });

    return <AppNavigator navigation={ navigation } />;
  }
}


// TODO: try moving this to another file
const mapStateToProps = (state) => ({
  nav: state.nav
});


//--------------------------------------------------------------------//


export default connect(
  mapStateToProps
)(AppWithNavigationState);
