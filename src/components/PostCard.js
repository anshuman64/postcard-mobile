// Library Imports
import React                          from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import PostContent                    from './PostContent.js';
import LoveBar                        from './LoveBar.js';

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

export default PostCard;
