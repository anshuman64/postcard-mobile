import React, { Component }                     from 'react';
import { View, Button, Text, TextInput, Image, TouchableHighlight } from 'react-native';

import firebase                                 from 'react-native-firebase';

class ConfirmCodeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  static navigationOptions = {
    tabBarVisible: false,
    title: 'Confirm Code'
  };

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <TextInput
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        keyboardType={'numeric'}
        maxLength={6}
        placeholder={'------'}
        style={{width: 50, height: 40, textAlign: 'center'}}/>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('AllPosts')} underlayColor='grey' style={{justifyContent: 'center', height: 40}}>
          <Text>
            Enter
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default ConfirmCodeScreen;
