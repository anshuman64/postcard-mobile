// Library Imports
import React                                                                                from 'react';
import { Platform, StyleSheet, View, Text, TextInput, ImageBackground, TouchableHighlight } from 'react-native';


class PostButton extends React.Component {
  render () {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('AllPosts')} underlayColor='grey' style={{height: '100%', width: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          Post
        </Text>
      </TouchableHighlight>
    )
  }
}

class NewPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  static navigationOptions = {
    title: 'Create Post',
    headerRight: <PostButton />
  };

  render () {
    return (
      <View style={{height: 250, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          style={{height: '100%', alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
          source={{uri: 'https://s3-us-west-1.amazonaws.com/insiya-content/Post-Gradient.png'}}
        >
          <TextInput
            onChangeText={(text) => this.setState({text})}
            onContentSizeChange={(event) => { this.setState({ height: event.nativeEvent.contentSize.height })}}
            value={this.state.text}
            multiline={true}
            underlineColorAndroid={'transparent'}
            style={{height: '100%', width: '100%', color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 15, fontSize: 24}}
          />
        </ImageBackground>
      </View>
    )
  }
}

export default NewPost;
