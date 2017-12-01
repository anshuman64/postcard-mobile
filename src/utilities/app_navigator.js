// Library Imports
import React                                                        from 'react';
import PropTypes                                                    from 'prop-types';
import { connect }                                                  from 'react-redux';
import { BackHandler }                                              from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions }  from 'react-navigation';

// Local Imports
import LoginScreenContainer        from '../components/login_screen/login_screen_container.js';
import ConfirmCodeScreenContainer  from '../components/confirm_code_screen/confirm_code_screen_container.js';
import PostsScreen                 from '../components/screens/posts_screen.js';
import NewPostScreen               from '../components/screens/newpost_screen.js';
import { toBackScreen }            from '../actions/navigation_actions.js';


//--------------------------------------------------------------------//


export const AppNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreenContainer },
  ConfirmCodeScreen: { screen: ConfirmCodeScreenContainer },
  PostsScreen: { screen: PostsScreen },
  NewPostScreen: { screen: NewPostScreen },
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
    if (this.props.nav.index === 0) {
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
