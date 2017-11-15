// Library Imports
import React                                from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ImageBackground, Image, FlatList, ActivityIndicator, TouchableHighlight, ScrollView } from 'react-native';

class PostContent extends React.Component {
  render () {
    return (
      <View style={{height: 250, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          style={{height: '100%', alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
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
      <View style={{padding: 10}}>
        <PostContent />
        <LoveBar />
      </View>
    )
  }
}

class NewPostButton extends React.Component {
  _onPressButton = () => {

  }

  render () {
    return (
      <TouchableHighlight onPress={this._onPressButton} underlayColor='grey'>
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
      // <View style={{ height: 20, backgroundColor: 'gainsboro' }} />
    )
  }
}

//--------------------------------------------------------------------//

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: ''};
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 20,
          backgroundColor: 'gainsboro'
        }}
      />
    );
  }

  renderFooter = () => {
    // if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderHeader = () => {
      return (
        <View>
          <NewPostButton />
          <View style={{
            height: 20,
            backgroundColor: 'gainsboro'
          }} />
        </View>
      )
    };

  render() {
    return (
      <View>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={ () => (
            <PostCard />
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

//     ____  _         _
//    / ___|| |_ _   _| | ___  ___
//    \___ \| __| | | | |/ _ \/ __|
//     ___) | |_| |_| | |  __/\__ \
//    |____/ \__|\__, |_|\___||___/
//              |___/

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  welcome: {
    fontSize: 20,
    marginTop: 10
  }
});

//--------------------------------------------------------------------//

export default App;

// <TextInput
//   onChangeText={(text) => this.setState({text})}
//   onContentSizeChange={(event) => { this.setState({ height: event.nativeEvent.contentSize.height })}}
//   value={this.state.text}
//   multiline={true}
//   maxHeight={70}
//   underlineColorAndroid={'transparent'}
//   style={{backgroundColor: 'gainsboro', flex: 1, height: '100%'}}
// />
