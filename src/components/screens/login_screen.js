import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { toCodeAuthScreen } from '../../actions/navigation_actions.js';


class LoginScreen extends React.Component {
  render() {
    const {navigation} = this.props;

    return (
      <View>
        <Text>Login Screen</Text>
        <Button title={'To CodeAuth Screen'} onPress={() => navigation.dispatch(toCodeAuthScreen())} />
      </View>
    )
  }
}

export default LoginScreen;
