// Library Imports
import React, { Component }                                        from 'react';
import { Platform, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';

import PostCard                                                    from '../PostCard.js';
import AllPostsScreen                                              from './AllPostsScreen.js';


class MyPostsScreen extends AllPostsScreen {
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

export default MyPostsScreen;
