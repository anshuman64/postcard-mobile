// Library Imports
import React, { Component }                                                         from 'react';
import { Platform, StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';


class NewPostButton extends Component {
  render () {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('NewPost')} underlayColor='grey'>
        <View style={{height: 60, flexDirection: 'row', padding: 10}}>
          <Image
            style={{height: 40, width: 40, resizeMode: 'stretch'}}
            source={{uri: 'https://s3-us-west-1.amazonaws.com/insiya-content/Post-Gradient.png'}}
          />
          <Text style={{color: 'grey', fontWeight: 'bold', textAlign: 'left', alignSelf:'center', paddingLeft: 15}}>
            What are you grateful for today?
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default NewPostButton;
