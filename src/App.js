// Library Imports
import React, { Component }             from 'react';
import { Platform, StyleSheet, View }   from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import PhoneAuthScreen                  from './components/screens/PhoneAuthScreen.js';
import ConfirmCodeScreen                from './components/screens/ConfirmCodeScreen.js';
import AllPostsScreen                   from './components/screens/AllPostsScreen.js';
import MyPostsScreen                    from './components/screens/MyPostsScreen.js';
import NewPostScreen                    from './components/screens/NewPostScreen.js';


const RootNavigator = StackNavigator({
  PhoneAuth: {
    screen: PhoneAuthScreen
  },
  ConfirmCode: {
    screen: ConfirmCodeScreen
  },
  AllPosts: {
    screen: AllPostsScreen
  },
  NewPost: {
    screen: NewPostScreen
  }
});

const PostNavigator = TabNavigator({
  AllPosts: {
    screen: RootNavigator
  },
  MyPosts: {
    screen: MyPostsScreen
  }
})


class App extends Component {
  render() {
    return (
      <PostNavigator />
    )
  }
}


export default App;
