// Library Imports
import React                            from 'react';
import { AppState, BackHandler, View }  from 'react-native';
import { Provider }                     from 'react-redux';
import { Scene, Tabs, Stack, Actions }  from 'react-native-router-flux';

// Local Imports
import { amplitude }              from './utilities/analytics_utility.js';
import configureStore             from './store';
import RouterContainer            from './router/router_container.js';

import DebugLoginScreenContainer  from './screens/debug_login_screen/debug_login_screen_container.js';
import LoadingScreenContainer     from './screens/loading_screen/loading_screen_container.js';
import LoginScreenContainer       from './screens/login_screen/login_screen_container.js';
import ConfirmCodeScreenContainer from './screens/confirm_code_screen/confirm_code_screen_container.js';
import UsernameScreenContainer    from './screens/username_screen/username_screen_container.js';
import AvatarScreenContainer      from './screens/avatar_screen/avatar_screen_container.js';

import HomeScreenContainer        from './screens/home_screen/home_screen_container.js';
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

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener("hardwareBackPress", this._onBackPress);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener("hardwareBackPress", this._onBackPress);
  }

  _handleAppStateChange = (nextAppState) => {
    if (currentAppState.match(/inactive|background/) && nextAppState === 'active') {
        amplitude.logEvent('App - Focus App');
    } else if (nextAppState.match(/inactive|background/) && currentAppState === 'active') {
        amplitude.logEvent('App - Minimize App');
    }

    currentAppState = nextAppState;
  }

  _onBackPress = () => {
    if (Actions.currentScene === '_HomeScreen'
        || Actions.currentScene === 'LoginScreen'
        || Actions.currentScene === 'LoadingScreen'
        || Actions.currentScene === 'DebugLoginScreen'
        || Actions.currentScene === 'UsernameScreenLogin') {
      return false;
    }

    Actions.pop();
    return true;
  };

  render() {
    return (
      <Provider store={ this.store }>
        <RouterContainer>
          <Scene key='root' headerMode={'screen'} >
            <Scene key='DebugLoginScreen' component={DebugLoginScreenContainer}  hideNavBar={true}  />
            <Scene key='LoadingScreen' component={LoadingScreenContainer} initial={true} hideNavBar={true}  />
            <Scene key='LoginScreen' component={LoginScreenContainer} hideNavBar={true}  />
            <Scene key='ConfirmCodeScreen' component={ConfirmCodeScreenContainer}  navBar={() => <HeaderContainer backIcon={true} backTitle={'Confirm Code'}/> } />
            <Scene key='UsernameScreenLogin' component={UsernameScreenContainer}  navBar={() => <HeaderContainer backTitle={'Username'}/>}  />
            <Scene key='AvatarScreen' component={AvatarScreenContainer}  navBar={() => <HeaderContainer backIcon={true} backTitle={'Avatar'}/>}  />
            <Tabs key='MainScreenTabs' tabBarPosition={'bottom'}  tabBarComponent={FooterContainer} swipeEnabled={false} lazy={true} navBar={() => <HeaderContainer settingsIcon={true} logo={true} noteIcon={true}/>} >
              <Scene key='HomeScreen' component={HomeScreenContainer} initial={true} hideNavBar={true}  />
              <Scene key='ProfileScreen' component={ProfileScreenContainer} hideNavBar={true} />
            </Tabs>
            <Scene key='UserScreen' component={UserScreen} hideNavBar={true} />
            <Scene key='NewPostScreen' component={NewPostScreenContainer}  hideNavBar={true}  />
            <Scene key='MenuScreen' component={MenuScreen} navBar={() => <HeaderContainer backIcon={true} backTitle={'Settings'}/>}  />
            <Scene key='UsernameScreen' component={UsernameScreenContainer}  navBar={() => <HeaderContainer backIcon={true} backTitle={'Username'}/>}  />
            <Scene key='CameraRollScreen' component={CameraRollScreenContainer}  navBar={() => <HeaderContainer backIcon={true} backTitle={'Gallery'}/>}  />
          </Scene>
        </RouterContainer>
      </Provider>
    );
  }
}


//--------------------------------------------------------------------//

export default App;
