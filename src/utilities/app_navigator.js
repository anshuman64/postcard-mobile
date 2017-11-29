// Library Imports
import React                                                        from 'react';
import PropTypes                                                    from 'prop-types';
import { connect }                                                  from 'react-redux';
import { BackHandler }                                              from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions }  from 'react-navigation';

// Local Imports
import LoginScreen        from '../components/login_screen/login_screen.js';
import ConfirmCodeScreen  from '../components/confirm_code_screen/confirm_code_screen.js';
import PostsScreen        from '../components/screens/posts_screen.js';
import NewPostScreen      from '../components/screens/newpost_screen.js';
import { toBackScreen }   from '../actions/navigation_actions.js';


//--------------------------------------------------------------------//


export const AppNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  ConfirmCodeScreen: { screen: ConfirmCodeScreen },
  PostsScreen: { screen: PostsScreen },
  NewPostScreen: { screen: NewPostScreen }
});

class AppWithNavigationState extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(toBackScreen());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav
    });

    return <AppNavigator navigation={navigation} />;
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});


//--------------------------------------------------------------------//


export default connect(mapStateToProps)(AppWithNavigationState);
