// Library Imports
import React                           from 'react';
import { AppState, BackHandler, View } from 'react-native';
import { Provider }                    from 'react-redux';
import { Scene, Tabs, Actions }        from 'react-native-router-flux';
import OneSignal                       from 'react-native-onesignal';
import RNExitApp                       from 'react-native-exit-app';

// Local Imports
import * as PushUtility           from './utilities/push_utility.js';
import { amplitude }              from './utilities/analytics_utility.js';
import configureStore             from './store';
import RouterContainer            from './router/router_container.js';

import DebugLoginScreenContainer  from './screens/debug_login_screen/debug_login_screen_container.js';
import LoadingScreenContainer     from './screens/loading_screen/loading_screen_container.js';

import WelcomeScreenContainer     from './screens/welcome_screen/welcome_screen_container.js';
import LoginScreenContainer       from './screens/login_screen/login_screen_container.js';
import ConfirmCodeScreenContainer from './screens/confirm_code_screen/confirm_code_screen_container.js';
import UsernameScreenContainer    from './screens/username_screen/username_screen_container.js';
import AvatarScreenContainer      from './screens/avatar_screen/avatar_screen_container.js';

import HomeScreenContainer        from './screens/home_screen/home_screen_container.js';
import DiscoverScreenContainer    from './screens/discover_screen/discover_screen_container.js';
import FriendScreenContainer      from './screens/friend_screen/friend_screen_container.js';
import ProfileScreenContainer     from './screens/profile_screen/profile_screen_container.js';

import UserScreenContainer        from './screens/user_screen/user_screen_container.js';
import NewPostScreenContainer     from './screens/new_post_screen/new_post_screen_container.js';
import ShareScreenContainer       from './screens/share_screen/share_screen_container.js';
import CameraRollScreenContainer  from './screens/camera_roll_screen/camera_roll_screen_container.js';
import AddFriendScreenContainer   from './screens/add_friend_screen/add_friend_screen_container.js';
import MenuScreen                 from './screens/menu_screen/menu_screen.js';

import HeaderContainer            from './components/header/header_container.js';
import FooterContainer            from './components/footer/footer_container.js';

//--------------------------------------------------------------------//

class App extends React.Component {
  store = configureStore();

  constructor() {
    super();

    amplitude.logEvent('App - Open App');
    currentAppState = 'active';
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentWillMount() {
    OneSignal.addEventListener('received', PushUtility.onReceived);
    OneSignal.addEventListener('opened', PushUtility.onOpened);
    OneSignal.addEventListener('registered', PushUtility.onRegistered);
    OneSignal.addEventListener('ids', PushUtility.onIds);
  }

  // Listens to changes in AppState and when Android backButton is pressed
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener("hardwareBackPress", this._onBackPress);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener("hardwareBackPress", this._onBackPress);

    OneSignal.removeEventListener('received', PushUtility.onReceived);
    OneSignal.removeEventListener('opened', PushUtility.onOpened);
    OneSignal.removeEventListener('registered', PushUtility.onRegistered);
    OneSignal.removeEventListener('ids', PushUtility.onIds);
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  // When AppState changes, log event
  _handleAppStateChange = (nextAppState) => {
    if (currentAppState.match(/inactive|background/) && nextAppState === 'active') {
      amplitude.logEvent('App - Focus App');
    } else if (nextAppState.match(/inactive|background/) && currentAppState === 'active') {
      amplitude.logEvent('App - Minimize App');
    }

    currentAppState = nextAppState;
  }

  // When on the screens listed, close the app. Else, go back one screen.
  _onBackPress = () => {
    if (Actions.currentScene === '_HomeScreen'
        || Actions.currentScene === '_DiscoverScreen'
        || Actions.currentScene === '_FriendScreen'
        || Actions.currentScene === '_ProfileScreen'
        || Actions.currentScene === 'WelcomeScreen'
        || Actions.currentScene === 'LoadingScreen'
        || Actions.currentScene === 'DebugLoginScreen'
        || Actions.currentScene === 'UsernameScreenLogin') {
      RNExitApp.exitApp();
      return false;
    }

    Actions.pop();
    return true;
  };

  _renderHeader = (backTitle, backIcon) => {
    return () => {
      return (
        <HeaderContainer backTitle={backTitle} backIcon={backIcon} />
      );
    };
  }

  render() {
    return (
      <Provider store={ this.store }>
        <RouterContainer>
          <Scene key='root' headerMode={'screen'} >
            <Scene key='DebugLoginScreen' component={DebugLoginScreenContainer} panHandlers={null} hideNavBar={true} />

            <Scene key='LoadingScreen' component={LoadingScreenContainer} panHandlers={null} hideNavBar={true} initial={true} />
            <Scene key='WelcomeScreen' component={WelcomeScreenContainer} panHandlers={null} hideNavBar={true} />
            <Scene key='LoginScreen'   component={LoginScreenContainer}   panHandlers={null} hideNavBar={true} />
            <Scene key='NewPostScreen' component={NewPostScreenContainer} panHandlers={null} hideNavBar={true} />
            <Scene key='ShareScreen'   component={ShareScreenContainer}   panHandlers={null} hideNavBar={true} />
            <Scene key='UserScreen'    component={UserScreenContainer}    panHandlers={null} hideNavBar={true} />

            <Scene key='ConfirmCodeScreen'   component={ConfirmCodeScreenContainer} panHandlers={null} navBar={this._renderHeader('Confirm Code', true)} />
            <Scene key='UsernameScreenLogin' component={UsernameScreenContainer}    panHandlers={null} navBar={this._renderHeader('Username')} />
            <Scene key='UsernameScreen'      component={UsernameScreenContainer}    panHandlers={null} navBar={this._renderHeader('Username', true)} />
            <Scene key='AvatarScreen'        component={AvatarScreenContainer}      panHandlers={null} navBar={this._renderHeader('Profile Photo', true)} />
            <Scene key='CameraRollScreen'    component={CameraRollScreenContainer}  panHandlers={null} navBar={this._renderHeader('Gallery', true)} />
            <Scene key='AddFriendScreen'     component={AddFriendScreenContainer}   panHandlers={null} navBar={this._renderHeader('Add Friends', true)} />
            <Scene key='MenuScreen'          component={MenuScreen}                 panHandlers={null} navBar={this._renderHeader('Settings', true)} />

            <Tabs key='MainScreenTabs'
              tabBarPosition={'bottom'}
              tabBarComponent={FooterContainer}
              swipeEnabled={false}
              lazy={true}
              animationEnabled={false}
              panHandlers={null}
              >
              <Scene key='HomeScreen'     component={HomeScreenContainer}     panHandlers={null} navBar={() => <HeaderContainer logo={true} />} initial={true} />
              <Scene key='DiscoverScreen' component={DiscoverScreenContainer} panHandlers={null} hideNavBar={true} />
              <Scene key='FriendScreen'   component={FriendScreenContainer}   panHandlers={null} hideNavBar={true} />
              <Scene key='ProfileScreen'  component={ProfileScreenContainer}  panHandlers={null} navBar={() => <HeaderContainer backTitle={'Your Profile'} blank={true} noBorder={true} settingsIcon={true} />} />
            </Tabs>
          </Scene>
        </RouterContainer>
      </Provider>
    );
  }
}


//--------------------------------------------------------------------//

export default App;
