// Library Imports
import React                                       from 'react';
import { Platform, StyleSheet, View, Text, Image } from 'react-native';

class LoveBar extends React.Component {
  render () {
    return (
      <View style={{height: 40, flexDirection: 'row', padding: 4}}>
        <Image
          style={{height: 40, width: 40, resizeMode: 'contain'}}
          source={require('./ic_mood_black_48dp.png')}
        />
        <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'left', alignSelf:'center', paddingLeft: 5}}>
          100
        </Text>
      </View>
    )
  }
}

export default LoveBar;
