import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { toBackScreen } from '../../actions/navigation_actions.js';


class NewPostScreen extends React.Component {
  render() {
    const {navigation} = this.props;

    return (
      <View>
        <Text>NewPost Screen</Text>
        <Button title={'Go Back'} onPress={() => navigation.dispatch(toBackScreen())} />
      </View>
    )
  }
}

export default NewPostScreen;
