import React                                from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ImageBackground, Image } from 'react-native';

class PostContent extends React.Component {
  render () {
    return (
      <View style={{height: 250, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          style={{height: 250, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
          source={{uri: 'https://s3-us-west-1.amazonaws.com/insiya-content/Post-Gradient.png'}}
        >
          <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 15}}>
            Today, I am grateful for Pani for keeping my hydrated in times of need
          </Text>
        </ImageBackground>
      </View>
    )
  }
}

class LoveBar extends React.Component {
  render () {
    return (
      <View style={{height: 40, flexDirection: 'row', padding: 4}}>
        <Image
          style={{height: 40, width: 40, resizeMode: 'contain'}}
          source={require('../ic_mood_black_48dp.png')}
        />
        <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'left', alignSelf:'center', paddingLeft: 5}}>
          100
        </Text>
      </View>
    )
  }
}

class PostCard extends React.Component {
  render () {
    return (
      <View style={{padding: 10, backgroundColor: 'white'}}>
        <PostContent />
        <LoveBar />
      </View>
    )
  }
}

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { text: '' };
  // }

  render() {
    return (
      <View>
        <PostCard />
        <View style={{height: 20, backgroundColor: 'gainsboro'}}></View>
        <PostCard />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   postBody: {
//   }
// });

export default App;
