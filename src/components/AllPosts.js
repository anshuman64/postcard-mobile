// Library Imports
import React                                                       from 'react';
import { Platform, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import PostCard                                                    from './PostCard.js';
import NewPostButton                                               from './NewPostButton.js';


class AllPosts extends React.Component {
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
          <NewPostButton navigation={this.props.navigation} />
          <View style={{
            height: 20,
            backgroundColor: 'gainsboro'
          }} />
        </View>
      )
    };


  static navigationOptions = {
    header: null
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

export default AllPosts;
