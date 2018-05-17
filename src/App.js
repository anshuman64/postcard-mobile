// Library Imports
import React                    from 'react';
import RN                       from 'react-native';
import { Provider }             from 'react-redux';
import { Scene, Tabs, Actions } from 'react-native-router-flux';

// Local Imports
import { amplitude }               from './utilities/analytics_utility';
import configureStore              from './store';
import RouterContainer             from './router/router_container';

import DebugLoginScreenContainer   from './screens/debug_login_screen/debug_login_screen_container';
import LoadingScreenContainer      from './screens/loading_screen/loading_screen_container';

import WelcomeScreenContainer      from './screens/welcome_screen/welcome_screen_container';
import LoginScreenContainer        from './screens/login_screen/login_screen_container';
import ConfirmCodeScreenContainer  from './screens/confirm_code_screen/confirm_code_screen_container';
import TextInputScreenContainer    from './screens/text_input_screen/text_input_screen_container';
import AvatarScreenContainer       from './screens/avatar_screen/avatar_screen_container';

import HomeScreenContainer         from './screens/home_screen/home_screen_container';
import FriendScreenContainer       from './screens/friend_screen/friend_screen_container';
import PendingScreenContainer      from './screens/pending_screen/pending_screen_container';
import AuthoredScreenContainer     from './screens/profile_tabs/authored_screen/authored_screen_container';
import LikedScreenContainer        from './screens/profile_tabs/liked_screen/liked_screen_container';

import UserScreenContainer         from './screens/user_screen/user_screen_container';
import MessagesScreenContainer     from './screens/messages_screen/messages_screen_container';
import NewPostScreenContainer      from './screens/new_post_screen/new_post_screen_container';
import ShareScreenContainer        from './screens/share_screen/share_screen_container';
import CreateGroupScreenContainer  from './screens/create_group_screen/create_group_screen_container';
import CreateCircleScreenContainer from './screens/create_circle_screen/create_circle_screen_container';
import MenuScreen                  from './screens/menu_screen/menu_screen';
import GroupMenuScreenContainer    from './screens/group_menu_screen/group_menu_screen_container';

import HeaderContainer             from './components/header/header_container';
import FooterContainer             from './components/footer/footer_container';
import TabBarContainer             from './components/tab_bar/tab_bar_container';

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

  // Listens to changes in AppState and when Android backButton is pressed
  // NOTE: don't try to move these to LoadingScreen--it doesn't work!
  componentDidMount() {
    RN.AppState.addEventListener('change', this._handleAppStateChange);
    RN.BackHandler.addEventListener("hardwareBackPress", this._onBackPress);
  }

  componentWillUnmount() {
    RN.AppState.removeEventListener('change', this._handleAppStateChange);
    RN.BackHandler.removeEventListener("hardwareBackPress", this._onBackPress);
  }

  //--------------------------------------------------------------------//
  // Callback Methods
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
    let currentScene = Actions.currentScene.replace(/^_/, '');

    if (currentScene === 'LoadingScreen'
        || currentScene === 'WelcomeScreen'
        || currentScene === 'UsernameScreenLogin'
        || currentScene === 'HomeScreen'
        || currentScene === 'DebugLoginScreen') {
      RN.BackHandler.exitApp();
      return false;
    }

    Actions.pop();
    return true;
  };

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderHeader = (backTitle, backIcon) => {
    return () => {
      return (
        <HeaderContainer backTitle={backTitle} backIcon={backIcon} />
      );
    };
  }

  //WARNING/NOTE: All screens with PostLists have to be on different screens for performance benefits
  render() {
    return (
      <Provider store={ this.store }>
        <RouterContainer>
          <Scene key='root' headerMode={'screen'} >
            <Scene key='DebugLoginScreen' component={DebugLoginScreenContainer} panHandlers={null} hideNavBar={true} />

            <Scene key='LoadingScreen'         component={LoadingScreenContainer}      panHandlers={null} hideNavBar={true} initial={true}/>
            <Scene key='WelcomeScreen'         component={WelcomeScreenContainer}      panHandlers={null} hideNavBar={true} />
            <Scene key='LoginScreen'           component={LoginScreenContainer}        panHandlers={null} hideNavBar={true} />
            <Scene key='NewPostScreen'         component={NewPostScreenContainer}      panHandlers={null} hideNavBar={true} />
            <Scene key='ShareScreen'           component={ShareScreenContainer}        panHandlers={null} hideNavBar={true} />
            <Scene key='CreateCircleScreen'    component={CreateCircleScreenContainer} panHandlers={null} hideNavBar={true} />
            <Scene key='CreateGroupScreen'     component={CreateGroupScreenContainer}  panHandlers={null} hideNavBar={true} />
            <Scene key='AddGroupMembersScreen' component={CreateGroupScreenContainer}  panHandlers={null} hideNavBar={true} />
            <Scene key='MessagesScreen'        component={MessagesScreenContainer}     panHandlers={null} hideNavBar={true} />
            <Scene key='UserScreen'            component={UserScreenContainer}         panHandlers={null} hideNavBar={true} />

            <Scene key='ConfirmCodeScreen'      component={ConfirmCodeScreenContainer} panHandlers={null} navBar={this._renderHeader('Confirm Code', true)} />
            <Scene key='UsernameScreenLogin'    component={TextInputScreenContainer}   panHandlers={null} navBar={this._renderHeader('Username')} />
            <Scene key='UsernameScreen'         component={TextInputScreenContainer}   panHandlers={null} navBar={this._renderHeader('Username', true)} />
            <Scene key='DisplayNameScreenLogin' component={TextInputScreenContainer}   panHandlers={null} navBar={this._renderHeader('Display Name')} />
            <Scene key='DisplayNameScreen'      component={TextInputScreenContainer}   panHandlers={null} navBar={this._renderHeader('Display Name', true)} />
            <Scene key='AvatarScreen'           component={AvatarScreenContainer}      panHandlers={null} navBar={this._renderHeader('Profile Photo', true)} />
            <Scene key='AddFriendScreen'        component={TextInputScreenContainer}   panHandlers={null} navBar={this._renderHeader('Add Friends', true)} />
            <Scene key='NameCircleScreen'       component={TextInputScreenContainer}   panHandlers={null} navBar={this._renderHeader('Create Circle', true)} />
            <Scene key='NameGroupScreen'        component={TextInputScreenContainer}   panHandlers={null} navBar={this._renderHeader('Name Group', true)} />
            <Scene key='MenuScreen'             component={MenuScreen}                 panHandlers={null} navBar={this._renderHeader('Settings', true)} />
            <Scene key='GroupMenuScreen'        component={GroupMenuScreenContainer}   panHandlers={null} navBar={this._renderHeader('Group Settings', true)} />

            <Tabs key='MainTabs' tabBarPosition={'bottom'} tabBarComponent={FooterContainer} swipeEnabled={false} lazy={true} animationEnabled={false} panHandlers={null}>
              <Scene key='HomeScreen'     component={HomeScreenContainer}   panHandlers={null} navBar={() => <HeaderContainer logo={true} />} initial={true} />
              <Scene key='FriendScreen'  component={FriendScreenContainer}  panHandlers={null} navBar={() => <HeaderContainer logo={true} />} />
              <Scene key='PendingScreen' component={PendingScreenContainer} panHandlers={null} navBar={() => <HeaderContainer logo={true} />} />

              <Tabs key='ProfileTabs' tabBarComponent={() => <RN.View />} swipeEnabled={false} lazy={true} animationEnabled={false} panHandlers={null}>
                <Scene key='AuthoredScreen' component={AuthoredScreenContainer} panHandlers={null} navBar={() => <HeaderContainer backTitle={'Your Profile'} blank={true} noBorder={true} settingsIcon={true} />} />
                <Scene key='LikedScreen'    component={LikedScreenContainer}    panHandlers={null} navBar={() => <HeaderContainer backTitle={'Your Profile'} blank={true} noBorder={true} settingsIcon={true} />} />
              </Tabs>
            </Tabs>

          </Scene>
        </RouterContainer>
      </Provider>
    );
  }
}


//--------------------------------------------------------------------//

export default App;
