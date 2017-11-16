// Library Imports
import React, { Component }                                                      from 'react';
import { Platform, StyleSheet, View, Text, Image, ImageBackground } from 'react-native';


class PostContent extends Component {
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

class LoveBar extends Component {
  render () {
    return (
      <View style={{height: 40, flexDirection: 'row', padding: 4}}>
        <Image
          style={{height: 40, width: 40, resizeMode: 'contain'}}
          source={require('../resources/ic_mood_black_48dp.png')}
        />
        <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'left', alignSelf:'center', paddingLeft: 5}}>
          100
        </Text>
      </View>
    )
  }
}

class PostCard extends Component {
  render () {
    return (
      <View style={{padding: 10}}>
        <PostContent />
        <LoveBar />
      </View>
    )
  }
}

export default PostCard;
