// Library Imports
import React                           from 'react';
import { AppState, BackHandler, View } from 'react-native';
import { Provider }                    from 'react-redux';
import { Scene, Tabs, Actions }        from 'react-native-router-flux';

// Local Imports
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
import ProfileScreenContainer     from './screens/profile_screen/profile_screen_container.js';
import UserScreen                 from './screens/user_screen/user_screen.js';

import NewPostScreenContainer     from './screens/new_post_screen/new_post_screen_container.js';
import MenuScreen                 from './screens/menu_screen/menu_screen.js';
import CameraRollScreenContainer  from './screens/camera_roll_screen/camera_roll_screen_container.js';

import HeaderContainer            from './components/nav_bar_header/header_container.js';
import FooterContainer            from './components/nav_bar_footer/footer_container.js';

//--------------------------------------------------------------------//


class App extends React.Component {
  store = configureStore();

  constructor() {
    super();

    amplitude.logEvent('App - Open App');
    currentAppState = 'active';
  }

  // Listens to changes in AppState and when Android backButton is pressed
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener("hardwareBackPress", this._onBackPress);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener("hardwareBackPress", this._onBackPress);
  }

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
        || Actions.currentScene === 'WelcomeScreen'
        || Actions.currentScene === 'LoadingScreen'
        || Actions.currentScene === 'DebugLoginScreen'
        || Actions.currentScene === 'UsernameScreenLogin') {
      BackHandler.exitApp();
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
            <Scene key='UserScreen'    component={UserScreen}             panHandlers={null} hideNavBar={true} />

            <Scene key='ConfirmCodeScreen'   component={ConfirmCodeScreenContainer} panHandlers={null} navBar={this._renderHeader('Confirm Code', true)} />
            <Scene key='UsernameScreenLogin' component={UsernameScreenContainer}    panHandlers={null} navBar={this._renderHeader('Username')} />
            <Scene key='AvatarScreen'        component={AvatarScreenContainer}      panHandlers={null} navBar={this._renderHeader('Profile Photo', true)} />
            <Scene key='MenuScreen'          component={MenuScreen}                 panHandlers={null} navBar={this._renderHeader('Settings', true)} />
            <Scene key='UsernameScreen'      component={UsernameScreenContainer}    panHandlers={null} navBar={this._renderHeader('Username', true)} />
            <Scene key='CameraRollScreen'    component={CameraRollScreenContainer}  panHandlers={null} navBar={this._renderHeader('Gallery', true)} />

            <Tabs key='MainScreenTabs'
              tabBarPosition={'bottom'}
              tabBarComponent={FooterContainer}
              swipeEnabled={false}
              lazy={false}
              animationEnabled={false}
              panHandlers={null}
              >
              <Scene key='HomeScreen'          component={HomeScreenContainer}     panHandlers={null} navBar={() => <HeaderContainer logo={true} />} initial={true}/>
              <Scene key='DiscoverScreen'      component={DiscoverScreenContainer} panHandlers={null} hideNavBar={true} />
              <Scene key='FriendRequestScreen' component={HomeScreenContainer}     panHandlers={null} hideNavBar={true} />
              <Scene key='ProfileScreen'       component={ProfileScreenContainer}  panHandlers={null} navBar={() => <HeaderContainer backTitle={'Your Profile'} blank={true} noBorder={true} settingsIcon={true} />} />
            </Tabs>
          </Scene>
        </RouterContainer>
      </Provider>
    );
  }
}


//--------------------------------------------------------------------//

export default App;
