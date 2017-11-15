// Library Imports
import React                          from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { StackNavigator }             from 'react-navigation';
import AllPosts                       from './components/AllPosts.js';
import NewPost                        from './components/NewPost.js';


const RootNavigator = StackNavigator({
  AllPosts: {
    screen: AllPosts,
  },
  NewPost: {
    screen: NewPost,
  },
});

class App extends React.Component {
  render() {
    return (
      <RootNavigator />
    )
  }
}

// Styles

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
