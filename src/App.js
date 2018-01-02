// Library Imports
import React            from 'react';
import { AppState }     from 'react-native';
import { Provider }     from 'react-redux';
import { Scene, Tabs }  from 'react-native-router-flux';


// Local Imports
import { amplitude }              from './utilities/analytics_utility.js';
import configureStore             from './store';
import RouterContainer            from './router/router_container.js';

import DebugLoginScreenContainer  from './components/debug_login_screen/debug_login_screen_container.js';
import LoadingScreenContainer     from './components/loading_screen/loading_screen_container.js';
import LoginScreenContainer       from './components/login_screen/login_screen_container.js';
import ConfirmCodeScreenContainer from './components/confirm_code_screen/confirm_code_screen_container.js';

import HomeScreenContainer        from './components/home_screen/home_screen_container.js';
import AuthoredPostsTabContainer  from './components/user_screen/authored_posts_tab_container.js';
import LikedPostsTabContainer     from './components/user_screen/liked_posts_tab_container.js';

import NewPostScreen              from './components/new_post_screen/new_post_screen.js';
import MenuScreen                 from './components/menu_screen/menu_screen.js';

import HeaderContainer            from './components/nav_bar/header/header_container.js';
import FooterContainer            from './components/nav_bar/footer/footer_container.js';
import TabBarContainer            from './components/nav_bar/tab_bar/tab_bar_container.js';


//--------------------------------------------------------------------//


class App extends React.Component {
  store = configureStore();

  constructor() {
    super();

    amplitude.logEvent('General - Initialize App');
    currentAppState = 'active';
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (currentAppState.match(/inactive|background/) && nextAppState === 'active') {
        amplitude.logEvent('General - Open App');
    }

    currentAppState = nextAppState;
  }

  render() {
    return (
      <Provider store={ this.store }>
        <RouterContainer>
          <Scene key='root' headerMode={'screen'} >
            <Scene key='DebugLoginScreen' component={DebugLoginScreenContainer} hideNavBar={true}  />
            <Scene key='LoadingScreen' component={LoadingScreenContainer}  hideNavBar={true} initial={true}  />
            <Scene key='LoginScreen' component={LoginScreenContainer} hideNavBar={true} />
            <Scene key='ConfirmCodeScreen' component={ConfirmCodeScreenContainer} navBar={() => <HeaderContainer backIcon={true}/>} />
            <Tabs key='MainScreenTabs' tabBarPosition={'bottom'} tabBarComponent={FooterContainer} swipeEnabled={false} lazy={true} navBar={() => <HeaderContainer settingsIcon={true} logo={true} noteIcon={true}/>} >
              <Scene key='HomeScreen' component={HomeScreenContainer} initial={true} hideNavBar={true}  />
              <Tabs key='UserScreenTabs' tabBarPosition={'top'} tabBarComponent={TabBarContainer} swipeEnabled={true}>
                <Scene key='AuthoredPostsTab' component={AuthoredPostsTabContainer} initial={true} hideNavBar={true}  />
                <Scene key='LikedPostsTab' component={LikedPostsTabContainer} hideNavBar={true}  />
              </Tabs>
            </Tabs>
            <Scene key='NewPostScreen' component={NewPostScreen} hideNavBar={true} />
            <Scene key='MenuScreen' component={MenuScreen} navBar={() => <HeaderContainer backIcon={true}/>}  />
          </Scene>
        </RouterContainer>
      </Provider>
    );
  }
}

// TODO: add transition animation to UserScreen tabs so the blue highlight transitions smoothly, not just at the end


//--------------------------------------------------------------------//

export default App;
