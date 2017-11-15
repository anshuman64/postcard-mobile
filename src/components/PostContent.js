// Library Imports
import React                                                 from 'react';
import { Platform, StyleSheet, View, Text, ImageBackground } from 'react-native';

class PostContent extends React.Component {
  render () {
    return (
      <View style={{height: 250, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          style={{height: '100%', alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
          source={{uri: 'https://s3-us-west-1.amazonaws.com/insiya-content/Post-Gradient.png'}}
        >
          <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 15, fontSize: 24}}>
            Today, I am grateful for Pani for keeping my hydrated in times of need
          </Text>
        </ImageBackground>
      </View>
    )
  }
}

export default PostContent;
