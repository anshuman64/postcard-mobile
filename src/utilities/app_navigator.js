// Library Imports
import React                                                        from 'react';
import PropTypes                                                    from 'prop-types';
import { connect }                                                  from 'react-redux';
import { BackHandler, View, Text }                                              from "react-native";
import { addNavigationHelpers, StackNavigator, TabNavigator, NavigationActions }  from 'react-navigation';

// Local Imports
import LoginScreenContainer        from '../components/login_screen/login_screen_container.js';
import ConfirmCodeScreenContainer  from '../components/confirm_code_screen/confirm_code_screen_container.js';
import HomeScreen                  from '../components/home_screen/home_screen.js';
import MyPostsTab                  from '../components/user_screen/my_posts_tab.js';
import MyLikesTab                  from '../components/user_screen/my_likes_tab.js';
import NewPostScreenContainer      from '../components/new_post_screen/new_post_screen_container.js';
import MenuScreen                  from '../components/menu_screen/menu_screen.js';
import TabNavigatorHeader          from './tab_navigator_header.js';
import { toBackScreen }            from '../actions/navigation_actions.js';


//--------------------------------------------------------------------//

export const UserTabNavigator = TabNavigator({
  MyPostsTab: { screen: MyPostsTab },
  MyLikesTab: { screen: MyLikesTab },
});

const UserStackNavigator = StackNavigator({
  UserTabNavigator: { screen: UserTabNavigator },
  NewPostScreen: { screen: NewPostScreenContainer },
  MenuScreen: { screen: MenuScreen },
}, {
  headerMode: 'none'
});

const HomeStackNavigator = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  NewPostScreen: { screen: NewPostScreenContainer}
}, {
  headerMode: 'none'
});

const MainNavigator = TabNavigator({
  HomeStackNavigator: { screen: HomeStackNavigator },
  UserStackNavigator: { screen: UserStackNavigator }
}, {
  tabBarComponent: TabNavigatorHeader,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true
});

const LoginNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreenContainer },
  ConfirmCodeScreen: { screen: ConfirmCodeScreenContainer },
}, {
  headerMode: 'none'
});

export const AppNavigator = StackNavigator({
  // LoginNavigator: { screen: LoginNavigator },
  MainNavigator: { screen: MainNavigator }
}, {
  headerMode: 'none'
});

class AppWithNavigationState extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    console.log(this.props.nav)
    // Exit app if on LoginScreen or on HomeScreen
    if ( (this.props.nav.routes[0].routes.length === 1) ||
        (this.props.nav.routes.length === 2 && this.props.nav.routes[1].routes[0].routes.length === 1) ) {
      return false;
    }
    this.props.dispatch(toBackScreen());
    return true;
  };

  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav
    });

    return <AppNavigator navigation={navigation} />;
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  nav: state.nav
});


//--------------------------------------------------------------------//


export default connect(
  mapStateToProps
)(AppWithNavigationState);
