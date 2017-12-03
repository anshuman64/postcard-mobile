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

export const UserScreen = TabNavigator({
  MyPostsTab: { screen: MyPostsTab },
  MyLikesTab: { screen: MyLikesTab },
}, {
  tabBarComponent: TabNavigatorHeader,
  tabBarPosition: 'bottom'
})

export const AppNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreenContainer },
  ConfirmCodeScreen: { screen: ConfirmCodeScreenContainer },
  HomeScreen: { screen: HomeScreen },
  UserScreen: { screen: UserScreen },
  NewPostScreen: { screen: NewPostScreenContainer },
  MenuScreen: { screen: MenuScreen },
}, {
  navigationOptions: {
    tabBarVisible: false,
    header: null
  }
});

class AppWithNavigationState extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    if (this.props.nav.index === 0 || this.props.nav.index === 2) {
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
