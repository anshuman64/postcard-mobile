import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/screens/login_screen.js';
import CodeAuthScreen from '../components/screens/codeauth_screen.js';
import PostsScreen from  '../components/screens/posts_screen.js';
import NewPostScreen from  '../components/screens/newpost_screen.js';

export const AppNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  CodeAuthScreen: { screen: CodeAuthScreen },
  PostsScreen: { screen: PostsScreen },
  NewPostScreen: { screen: NewPostScreen }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
